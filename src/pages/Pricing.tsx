
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '1 Resume',
        'Basic Templates',
        'PDF Download',
        'Email Support',
        'Basic AI Suggestions'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited Resumes',
        'Premium Templates',
        'Advanced AI Writing',
        'ATS Optimization',
        'Cover Letter Builder',
        'Priority Support',
        'Resume Analytics'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'border-blue-500'
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      description: 'For serious career advancement',
      features: [
        'Everything in Pro',
        'Personal Career Coach',
        'LinkedIn Profile Optimization',
        'Interview Preparation',
        'Salary Negotiation Guide',
        'Career Path Planning',
        '1-on-1 Expert Review'
      ],
      cta: 'Go Premium',
      popular: false,
      color: 'border-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your career goals. Upgrade or downgrade at any time.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.color} ${plan.popular ? 'shadow-xl scale-105' : 'shadow-lg'} hover-lift`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                    asChild
                  >
                    <Link to="/signup">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. You'll continue to have access to premium features 
                    until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Is there a free trial?</h3>
                  <p className="text-gray-600">
                    Yes! We offer a 7-day free trial for our Pro plan. No credit card required to start. 
                    You can explore all premium features risk-free.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What payment methods do you accept?</h3>
                  <p className="text-gray-600">
                    We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                    All payments are processed securely through Stripe.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Do you offer student discounts?</h3>
                  <p className="text-gray-600">
                    Yes! Students can get 50% off any paid plan with a valid student email address. 
                    Contact our support team to apply for the student discount.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Career?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of professionals who've landed their dream jobs with ResumeAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link to="/signup">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="/features">
                    View All Features
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
