import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Github, Mail, Lock } from "lucide-react";
import useLogin from "@/hooks/useLogin";

// Validation schema
const loginSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit as SubmitHandler<LoginFormValues>)}
        className="space-y-4"
      >
        {/* Username */}
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <FormControl>
                  <Input
                    type="username"
                    placeholder="username"
                    className="pl-10 h-12 border-gray-200 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    className="pl-10 h-12 border-gray-200 rounded-full focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sign In Button */}
        <Button type="submit" className="w-full h-12 text-base font-medium rounded-full">
          {isPending ? "Signing in..." : "Sign in"}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-blue-50 text-gray-500">Or</span>
          </div>
        </div>

        {/* GitHub Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-12  font-medium bg-black text-white hover:text-white hover:bg-gray-700 rounded-full border-black"
        >
          <Github className="w-5 h-5 mr-2" />
          Sign in with GitHub
        </Button>
      </form>
    </Form>
  );
}
