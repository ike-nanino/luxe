export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMASBONANZA: "XMASBONANZA",
    EASTER25: "EASTER25",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;