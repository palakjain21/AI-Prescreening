import * as React from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
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
          <Badge variant="qualified" className="bg-green-50 text-green-700">
            Greeting Message
          </Badge>

          {/* Message Text */}
          <p className="text-gray-900 text-base leading-relaxed">
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
                    ? "border-gray-900 text-gray-900 hover:bg-gray-50"
                    : "border-gray-300 text-gray-500 hover:bg-gray-50"
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

