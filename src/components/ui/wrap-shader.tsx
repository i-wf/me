import { Warp } from "@paper-design/shaders-react"

export default function WarpShaderHero() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Warp
                style={{ height: "100%", width: "100%" }}
                proportion={0.45}
                softness={1}
                distortion={0.25}
                swirl={0.8}
                swirlIterations={10}
                shape="checks"
                shapeScale={0.1}
                scale={1}
                rotation={0}
                speed={0.5} // Slowed down for performance and better vibe
                colors={["hsl(280, 100%, 10%)", "hsl(250, 100%, 15%)", "hsl(280, 80%, 20%)", "hsl(260, 100%, 5%)"]}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
    )
}
