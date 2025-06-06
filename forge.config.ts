import { MakerDMG } from "@electron-forge/maker-dmg";
import { MakerZIP } from "@electron-forge/maker-zip";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

const config: ForgeConfig = {
	packagerConfig: {
		asar: true,
		icon: "./resources/icon",
		appBundleId: "com.claudecode.usage-overlay",
		appCategoryType: "public.app-category.developer-tools",
		appCopyright: "Copyright © 2024 Claude Code Team",
		darwinDarkModeSupport: true,
		extendInfo: {
			LSUIElement: true, // This makes the app a true menu bar app (no dock icon)
			LSBackgroundOnly: false, // Allow the app to show windows
		},
		// Disable signing for local builds
		osxSign: false,
	},
	rebuildConfig: {},
	makers: [
		new MakerZIP({}, ["darwin"]),
		new MakerDMG(
			{
				name: "Claude Usage Overlay",
				icon: "./resources/icon.icns",
			},
			["darwin"],
		),
	],
	plugins: [
		new AutoUnpackNativesPlugin({}),
		new FusesPlugin({
			version: FuseVersion.V1,
			[FuseV1Options.RunAsNode]: false,
			[FuseV1Options.EnableCookieEncryption]: true,
			[FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
			[FuseV1Options.EnableNodeCliInspectArguments]: false,
			[FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
			[FuseV1Options.OnlyLoadAppFromAsar]: true,
		}),
	],
};

export default config;
