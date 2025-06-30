import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardShine ({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <Card className={cn(className)}>
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardContent className="flex flex-col space-y-10">
        {children}
      </CardContent>
    </Card>
  );
}