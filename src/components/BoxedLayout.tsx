import { ReactNode } from "react";

interface BoxedLayoutProps {
  children: ReactNode;
}

export default function BoxedLayout({ children }: BoxedLayoutProps) {
  return (
    <div className="box-border min-h-screen w-full overflow-x-hidden border-2 border-gold bg-cream sm:border-[4px]">
      {children}
    </div>
  );
}
