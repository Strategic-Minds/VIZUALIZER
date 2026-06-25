import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "epoxy-flake";

  // Proxy blend thumbnails from FloorWIZ CDN (adds proper CORS + caching)
  const baseUrl = "https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends";
  
  const blendNums = [
    201,202,203,204,205,206,207,208,209,210,
    211,212,213,214,215,216,218,219,220,221,
    222,223,224,225,226,227,228,229,230,231,
    232,233,234,235,236,237,238,239,240,241,
    242,243,244,245,246,247,248,249,250,251,
    252,253,254,255,256,257,315,982
  ];

  const sizes = ["116","18","40"];
  const blends = blendNums.flatMap(n => 
    sizes.map(s => ({
      sku: `XPS-FB${n}-${s}`,
      thumbnail: `${baseUrl}/XPS-FB${n}-${s}.jpg`,
      num: n,
      size: s === "116" ? '1/16"' : s === "18" ? '1/8"' : '1/4"',
    }))
  );

  return NextResponse.json({ blends, total: blends.length });
}
