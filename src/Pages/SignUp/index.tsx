import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Github, User, Mail, Lock} from "lucide-react";
import useRegister from "@/hooks/useRegister";

const signupSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useRegister();

  // Get current tab from URL, default to 'signup'
  const currentTab = searchParams.get("tab") || "signup";

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const onSignupSubmit: SubmitHandler<SignupFormValues> = (values) => {
    console.log("Signup form submitted:", values);
    signup(values);
  };

  // Handle navigation between login and signup
  const handleSignInClick = () => {
    navigate("/login?tab=login");
  };

  const handleSignUpClick = () => {
    navigate("/signup?tab=signup");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-6xl w-full overflow-hidden shadow-lg rounded-2xl">
        <div className="flex">
          {/* Left Section - Form */}
          <div className="flex-1 p-8 lg:p-12 bg-blue-50">
            <div>
              {/* Logo/Title */}
              <h1 className="text-center text-2xl md:text-6xl font-serif italic font-medium text-black mb-8 tracking-wide">
                Sal
              </h1>

              {/* Tabs */}
              <Tabs
                value={currentTab}
                onValueChange={handleTabChange}
                className="mb-8"
              >
                <TabsList className="grid w-1/2 mx-auto  grid-cols-2 ">
                  <TabsTrigger
                    value="login"
                    className="rounded-full w-fit ms-auto tracking-wide py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-[#0078D4]"
                    onClick={handleSignInClick}
                  >
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-full w-fit tracking-wide py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-[#0078D4]"
                    style={{
                      backgroundColor: "#0078D4",
                      color: "#fff",
                    }}
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="mt-6">
                  <Form {...signupForm}>
                    <form
                      onSubmit={signupForm.handleSubmit(
                        onSignupSubmit as SubmitHandler<SignupFormValues>
                      )}
                      className="space-y-4"
                    >
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={signupForm.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="First name"
                                    className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Last Name"
                                    className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Username */}
                      <FormField
                        control={signupForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Username"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="E-mail"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="password"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Sign Up Button */}
                      <Button
                        type="submit"
                        className="w-full rounded-full h-12 text-base font-medium"
                      >
                        {isPending ? "Signing up..." : "Sign up"}
                      </Button>

                      {/* Divider */}
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-blue-50 text-gray-500">
                            Or
                          </span>
                        </div>
                      </div>

                      {/* GitHub Button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full h-12 text-base font-medium bg-black text-white hover:text-white hover:bg-gray-700 border-black"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Sign up with GitHub
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Section - Illustration */}
          <div className="hidden lg:flex flex-1 bg-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            {/* Characters and Speech Bubbles */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
              <div className="relative">
                {/* Left Character */}
                <div className="absolute -left-16 top-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Right Character */}
                <div className="absolute -right-16 top-8">
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Speech Bubbles */}
                <div className="absolute -top-8 left-4">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="text-2xl">?</div>
                  </div>
                </div>
                <div className="absolute -top-8 right-4">
                  <div className="bg-blue-600 rounded-lg p-2 shadow-lg">
                    <div className="text-2xl text-white">?</div>
                  </div>
                </div>
                <div className="absolute top-4 -left-8">
                  <div className="bg-blue-400 rounded-lg p-2 shadow-lg">
                    <div className="text-2xl text-white">?</div>
                  </div>
                </div>
                <div className="absolute top-4 -right-8">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <div className="text-2xl">?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
