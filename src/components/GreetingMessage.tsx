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
          {/* Badge */}
          <Badge variant="qualified" className="bg-success-muted text-success">
            Greeting Message
          </Badge>

          {/* Message Text */}
          <p className="text-foreground text-base leading-relaxed">
            {displayMessage}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {displayButtons.map((buttonText, index) => (
              <Button
                key={index}
                variant={index === 0 ? "outline" : "outline"}
                className={cn(
                  index === 0
                    ? "border-foreground text-foreground hover:bg-muted"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
                disabled
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

GreetingMessage.displayName = "GreetingMessage";

export { GreetingMessage };
