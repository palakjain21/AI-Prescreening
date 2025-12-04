import * as React from "react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { cn } from "../utils";

export interface GreetingMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  buttonOptions?: string[];
}

const GreetingMessage = React.forwardRef<HTMLDivElement, GreetingMessageProps>(
  ({ className, message, buttonOptions, ...props }, ref) => {
    const defaultMessage = "Thank you for your interest in an exciting career opportunity at Senseloaf. Let's spend the next few minutes getting to know one another to see if there's a current potential fit.";
    const defaultButtons = ["Ready to get Started", "Lets Begin", "Begin Screening", "Jump In"];

    const displayMessage = message || defaultMessage;
    const displayButtons = buttonOptions || defaultButtons;

    return (
      <Card variant="greeting" ref={ref} className={cn(className)} {...props}>
        <div className="space-y-4 text-left">
          <Badge variant="qualified">
            Greeting Message
          </Badge>

          <p className="text-gray-900 text-base leading-relaxed">
            {displayMessage}
          </p>

          <div className="flex flex-wrap gap-3">
            {displayButtons.map((buttonText, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  index === 0
                    ? "border-neutral-900 text-neutral-900"
                    : "border-neutral-100 text-neutral"
                )}
              >
                {buttonText}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    );
  }
);
export { GreetingMessage };

