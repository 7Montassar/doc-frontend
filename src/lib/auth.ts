"use server"

import {cookies} from "next/headers";

export async function setSession(token: string) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    (await cookies()).set('session', token,{
        expires, httpOnly: true
    });
}

export async function getSession() {

    const session = (await cookies()).get('session')?.value;
    if (!session) {
        throw new Error('Could not find session');
    }
    return session;
}

export async function clearSession() {
    (await cookies()).set('session', '', {
        expires: new Date(0), httpOnly: true
    });
}