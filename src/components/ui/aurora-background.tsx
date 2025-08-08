"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <main>
            <div
                className={cn(
                    "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-[#181825]",
                    className,
                )}
                {...props}
            >
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={
                        {
                            "--aurora":
                                "repeating-linear-gradient(120deg,#7dd3fc_10%,#818cf8_20%,#a78bfa_30%,#f472b6_40%,#facc15_50%)",
                            "--dark-gradient":
                                "repeating-linear-gradient(120deg,#181825_0%,#181825_10%,transparent_15%,transparent_18%,#181825_22%)",
                            "--white-gradient":
                                "repeating-linear-gradient(120deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

                            "--sky-300": "#7dd3fc",
                            "--indigo-400": "#818cf8",
                            "--violet-400": "#a78bfa",
                            "--pink-400": "#f472b6",
                            "--yellow-400": "#facc15",
                            "--black": "#181825",
                            "--white": "#fff",
                            "--transparent": "transparent",
                        } as React.CSSProperties
                    }
                >
                    <div
                        className={cn(
                            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-30 blur-[24px] invert filter will-change-transform [--aurora:repeating-linear-gradient(120deg,var(--sky-300)_10%,var(--indigo-400)_20%,var(--violet-400)_30%,var(--pink-400)_40%,var(--yellow-400)_50%)] [--dark-gradient:repeating-linear-gradient(120deg,var(--black)_0%,var(--black)_10%,var(--transparent)_15%,var(--transparent)_18%,var(--black)_22%)] [--white-gradient:repeating-linear-gradient(120deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

                            showRadialGradient &&
                                `[mask-image:radial-gradient(ellipse_at_80%_10%,black_10%,var(--transparent)_70%)]`,
                        )}
                    ></div>
                </div>
                {children}
            </div>
        </main>
    );
};
