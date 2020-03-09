import { usePackages } from "../lib";

export const init = usePackages(
  "ionide.ionide-fsharp",
  "ionide.ionide-paket",
  "patcx.vscode-nuget-gallery",
  "formulahendry.dotnet-test-explorer"
);
