"use client";
// Cmp
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Hooks
import { useForm } from "react-hook-form";
import { useTransition } from "react";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { toast } from "sonner";
import { login } from "@/actions/login";
import fetchHandler from "@/lib/fetch-handler";

const LoginForm = () => {
  const [ispending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(value).then(fetchHandler);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={ispending}
                    placeholder="请输入邮箱"
                    type="email"
                    className="border-primary"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={ispending}
                    placeholder="******"
                    type="password"
                    className="border-primary"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={ispending}>
          {ispending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          登录
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
