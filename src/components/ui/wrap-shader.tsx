import { Warp } from "@paper-design/shaders-react"
import { useState, useEffect } from "react"

export default function WarpShaderHero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Warp
                style={{ height: "100%", width: "100%" }}
                proportion={isMobile ? 0.3 : 0.45}
                softness={isMobile ? 1.2 : 1}
                distortion={isMobile ? 0.15 : 0.25}
                swirl={isMobile ? 0.4 : 0.8}
                swirlIterations={isMobile ? 4 : 10}
                shape="checks"
                shapeScale={isMobile ? 0.15 : 0.1}
                scale={1}
                rotation={0}
                speed={isMobile ? 0.3 : 0.5}
                colors={["hsl(280, 100%, 10%)", "hsl(250, 100%, 15%)", "hsl(280, 80%, 20%)", "hsl(260, 100%, 5%)"]}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
    )
}
