/**
 * Colors used to render a Swiss QR code.
 *
 * All properties are optional. Unspecified colors use the standard black and
 * white Swiss QR code appearance.
 */
export declare class QRTheme {
    /**
     * Color of the QR code modules.
     *
     * @default `"black"`
     */
    moduleColor?: string;
    /** Colors of the Swiss cross in the center of the QR code. */
    cross?: {
        /**
         * Color of the cross's outer border.
         *
         * @default `"white"`
         */
        borderColor?: string;
        /**
         * Color behind the cross.
         *
         * @default `"black"`
         */
        bgColor?: string;
        /**
         * Color of the cross itself.
         *
         * @default `"white"`
         */
        fillColor?: string;
    };
    /**
     * Resolves a partial theme to the colors used by the QR code renderers.
     *
     * @param theme Partial theme to resolve.
     * @returns Resolved theme.
     */
    static resolve(theme?: QRTheme): {
        cross: {
            bgColor: string;
            borderColor: string;
            fillColor: string;
        };
        moduleColor: string;
    };
}
