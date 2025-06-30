

import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export function CardMagic ({ children }: { children: ReactNode }) {
  return (
    <MagicCard
      gradientColor={"#262626"}
      className="py-5 h-full max-w-sm w-full border-none"
    >
      <CardContent className="p-4 flex flex-col items-start justify-between py-5">
        {children}
      </CardContent>
    </MagicCard>
  );
}


export function MagicCardDemo () {
  return (
    <Card className="p-0 max-w-sm w-full shadow-none border-none">
      <MagicCard
        gradientColor={"#262626"}
        className="p-0"
      >
        <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          test
        </CardContent>
        <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
          <Button className="w-full">Sign In</Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
