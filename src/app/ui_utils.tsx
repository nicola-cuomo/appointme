import { ToastActionElement } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Component, ThumbsUp } from "lucide-react";

export type notificationType =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "default";

export function showToast(
  title: string = "title",
  description: string = "",
  type: notificationType = "default",
  duration?: number,
  action?: ToastActionElement,
) {
  let icon = Component;
  switch (type) {
    case "success":
      icon;
  }
  if (type == "success") {
  }
  toast({
    title: title,
    description: description,
    variant: type,
    duration: duration,
    action: action,
  });
}

export function showError(description: string = "") {
  showToast("Something went wrong", description, "destructive");
}
