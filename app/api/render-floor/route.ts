import { NextRequest, NextResponse } from 'next/server';
export const runtime='nodejs';
export const maxDuration=60;
const MAX=12_000_000;

function blob(d: string){
  // Use non-named capture group (ES5 compatible)
  const m = /^data:([\w/+.\-]+);base64,(.+)$/.exec(d||'');
  if(!m) return {mime:'image/png',data:''};
  return {mime:m[1],data:m[2]};
}

export async function POST(req: NextRequest){
  if(!process.env.OPENAI_API_KEY) return NextResponse.json({error:'OpenAI key not configured. Add OPENAI_API_KEY to Vercel environment variables.'},{status:501});
  try {
    const body = await req.json();
    const {imageDataUrl,maskDataUrl,finish,style} = body;
    if(!imageDataUrl||!maskDataUrl) return NextResponse.json({error:'Missing imageDataUrl or maskDataUrl'},{status:400});
    
    const {data:imgData,mime:imgMime} = blob(imageDataUrl);
    if(imgData.length > MAX) return NextResponse.json({error:'Image too large (max 12MB)'},{status:413});

    const prompt = finish?.prompt || style?.prompt || 'Replace the floor with a beautiful epoxy coating, preserving room perspective, walls, and furniture.';
    
    const resp = await fetch('https://api.openai.com/v1/images/edits',{
      method:'POST',
      headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},
      body: (() => {
        const fd = new FormData();
        const imgBytes = Buffer.from(imgData,'base64');
        const maskBytes = Buffer.from(blob(maskDataUrl).data,'base64');
        fd.append('model','gpt-image-1');
        fd.append('prompt',prompt);
        fd.append('n','1');
        fd.append('size','1024x1024');
        fd.append('image',new Blob([imgBytes],{type:imgMime}),'image.png');
        fd.append('mask',new Blob([maskBytes],{type:'image/png'}),'mask.png');
        return fd;
      })()
    });

    if(!resp.ok){
      const err = await resp.json();
      return NextResponse.json({error:err.error?.message||'OpenAI error'},{status:resp.status});
    }

    const result = await resp.json();
    const b64 = result.data?.[0]?.b64_json;
    if(!b64) return NextResponse.json({error:'No image in response'},{status:500});
    
    return NextResponse.json({image:`data:image/png;base64,${b64}`});
  } catch(e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({error:msg},{status:500});
  }
}
