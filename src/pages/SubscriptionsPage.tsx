
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Clock, Mail, MailCheck, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subscriptionFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  frequency: z.enum(["daily", "weekly"], { 
    required_error: "Please select a frequency" 
  }),
  categories: z.array(z.string()).min(1, { 
    message: "Please select at least one category" 
  }),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive emails"
  })
});

const SubscriptionsPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: "",
      name: "",
      frequency: "weekly",
      categories: [],
      gdprConsent: false
    }
  });
  
  const onSubmit = (data: z.infer<typeof subscriptionFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Subscription data:", data);
      setIsSubmitting(false);
      toast({
        title: "Subscription successful!",
        description: "You'll now receive AI updates based on your preferences.",
        variant: "default"
      });
      form.reset();
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container py-6 px-4">
        <div className="flex flex-col gap-1.5 mb-6">
          <h1 className="text-3xl font-bold">Subscribe to AI Updates</h1>
          <p className="text-muted-foreground">
            Get regular updates about the latest AI tools, models, and research papers
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to AI Radar</CardTitle>
                <CardDescription>
                  Choose your subscription preferences to receive tailored AI updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="email">Email Digest</TabsTrigger>
                    <TabsTrigger value="api" disabled>API Access (Coming Soon)</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="email">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="frequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Update Frequency</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="daily" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Daily Digest
                                    </FormLabel>
                                  </FormItem>
                                  
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="weekly" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Weekly Roundup
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="categories"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Interested Categories</FormLabel>
                                <FormDescription>
                                  Select the AI categories you're interested in
                                </FormDescription>
                              </div>
                              
                              <div className="grid gap-2 md:grid-cols-2">
                                {[
                                  "NLP",
                                  "Computer Vision",
                                  "Multi-modal",
                                  "Generative AI",
                                  "Reinforcement Learning",
                                  "New Papers",
                                  "GitHub Trends",
                                  "Hugging Face Models"
                                ].map((category) => (
                                  <FormField
                                    key={category}
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => (
                                      <FormItem
                                        key={category}
                                        className="flex items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(category)}
                                            onCheckedChange={(checked) => {
                                              const currentValue = field.value || [];
                                              if (checked) {
                                                field.onChange([...currentValue, category]);
                                              } else {
                                                field.onChange(
                                                  currentValue.filter((value) => value !== category)
                                                );
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {category}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="gdprConsent"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0 mt-6">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="font-normal cursor-pointer">
                                  I agree to receive email updates based on my preferences
                                </FormLabel>
                                <FormDescription>
                                  You can unsubscribe at any time by clicking the link in the footer of our emails.
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Subscribing..." : "Subscribe to Updates"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subscription Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MailCheck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Regular Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Stay informed with the latest AI developments delivered to your inbox
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Curated Content</h4>
                      <p className="text-sm text-muted-foreground">
                        We filter and prioritize the most important AI innovations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Custom Categories</h4>
                      <p className="text-sm text-muted-foreground">
                        Select only the AI topics that matter to you
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subscription Plans</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                          Current
                        </div>
                        <div className="text-primary font-medium">Free</div>
                      </div>
                      <h3 className="text-lg font-semibold">Basic Digest</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Weekly or daily email digests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Customizable categories</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Web dashboard access</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 opacity-70">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-secondary/50 text-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                          Coming Soon
                        </div>
                        <div className="font-medium">$9/mo</div>
                      </div>
                      <h3 className="text-lg font-semibold">Pro Access</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Everything in Basic</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>API access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Custom alerts & notifications</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Advanced analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionsPage;
