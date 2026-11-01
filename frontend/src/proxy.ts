import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    let user: { id: string } | undefined;

    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });
        user = session?.user;
    } catch (error) {
        // Session lookup failed (e.g. transient DB error). Treat as signed out
        // so the request degrades to a login redirect instead of a hard 500.
        console.error("Proxy session lookup failed:", error);
    }

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-destination", 
        "/my-bookings",
        "/destinations/:path"
    ],
};
