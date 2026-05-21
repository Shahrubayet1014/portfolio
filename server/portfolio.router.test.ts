import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createCtx(role: "user" | "admin" | "anon" = "anon"): TrpcContext {
  const user: AuthenticatedUser | null =
    role === "anon"
      ? null
      : {
          id: 1,
          openId: "test-user",
          email: "t@example.com",
          name: "Tester",
          loginMethod: "manus",
          role: role === "admin" ? "admin" : "user",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("portfolio.submitMessage", () => {
  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(
      caller.portfolio.submitMessage({
        name: "Jane",
        email: "not-an-email",
        message: "hi",
      }),
    ).rejects.toThrow();
  });

  it("accepts a valid submission and persists via db helper", async () => {
    const spy = vi.spyOn(db, "createContactMessage").mockResolvedValue(undefined as any);
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.portfolio.submitMessage({
      name: "Jane",
      email: "jane@example.com",
      subject: "Project",
      message: "Hello there",
    });
    expect(result).toEqual({ success: true });
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0]?.[0]).toMatchObject({
      name: "Jane",
      email: "jane@example.com",
      subject: "Project",
      message: "Hello there",
    });
    spy.mockRestore();
  });
});

describe("portfolio admin guards", () => {
  it("blocks non-admin users from listing messages", async () => {
    const caller = appRouter.createCaller(createCtx("user"));
    await expect(caller.portfolio.listMessages()).rejects.toThrow();
  });

  it("allows admins to mark a message read", async () => {
    const spy = vi.spyOn(db, "markMessageRead").mockResolvedValue(undefined as any);
    const caller = appRouter.createCaller(createCtx("admin"));
    const result = await caller.portfolio.markMessageRead({ id: 42 });
    expect(result).toEqual({ success: true });
    expect(spy).toHaveBeenCalledWith(42, true);
    spy.mockRestore();
  });
});
