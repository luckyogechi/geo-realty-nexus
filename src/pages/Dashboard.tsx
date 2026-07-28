import React, { useState, useEffect } from 'react';
import { VERIFICATION_TASKS, TRANSACTIONS, PROPERTIES } from '../lib/mock-data';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import LandAppsSection from '../components/LandAppsSection';
import { 
  LayoutDashboard, ListChecks, FileText, BarChart3, Settings, 
  Search, Bell, Filter, MoreVertical, CircleCheck, XCircle, Clock, 
  ArrowUpRight, ArrowDownRight, Users, Plus, Upload, Download, Building, Sparkles, DollarSign, Eye,
  Mail, Phone, MessageSquare, Calendar, Trash2, MapPin, Tag, AppWindow
} from 'lucide-react';
import { toast } from 'sonner';
import type { OnboardingLead } from '../components/GetStartedModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState<OnboardingLead[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('land_trust_leads') || '[]');
      setLeads(stored);
    } catch {
      setLeads([]);
    }
  }, [activeTab]);

  const stats = [
    { label: 'Total Revenue', value: '₦12.5M', change: '+12%', icon: BarChart3, up: true },
    { label: 'Properties Verified', value: '48', change: '+5', icon: CircleCheck, up: true },
    { label: 'Pending Tasks', value: '12', change: '-2', icon: Clock, up: false },
    { label: 'Active Agents', value: '124', change: '+18', icon: Users, up: true },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white sticky top-16 h-[calc(100vh-64px)]">
        <div className="flex-1 py-6 px-4 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'tasks', label: 'Verification Tasks', icon: ListChecks },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'analytics', label: 'Revenue Analytics', icon: BarChart3 },
            { id: 'properties', label: 'Manage Properties', icon: Building },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'leads', label: 'Leads & Inquiries', icon: Users },
            { id: 'apps', label: 'App Store', icon: AppWindow },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="bg-primary/5 rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-primary uppercase">Current Role</p>
            <p className="text-sm font-bold">Admin Verifier</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Employee #8241</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
            <p className="text-muted-foreground">Here's what's happening across Land & Trust today.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tasks, docs..." className="pl-10 w-64 bg-white" />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(stat => (
                <Card key={stat.label} className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <Badge variant={stat.up ? 'secondary' : 'destructive'} className="gap-1 h-5 px-1.5 font-bold">
                        {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Tasks */}
              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                  <CardTitle className="text-lg">Recent Verification Tasks</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {VERIFICATION_TASKS.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex gap-4 items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            task.status === 'approved' ? 'bg-green-100 text-green-600' : 
                            task.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {task.status === 'approved' ? <CircleCheck className="h-5 w-5" /> : 
                             task.status === 'rejected' ? <XCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm line-clamp-1">{task.propertyTitle}</p>
                            <p className="text-xs text-muted-foreground">Assigned to: {task.assignedTo}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="capitalize text-[10px] font-bold">
                            {task.priority} Priority
                          </Badge>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Chart Placeholder */}
              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                  <CardTitle className="text-lg">Monthly Revenue Tracker</CardTitle>
                  <select className="bg-transparent border-none text-sm font-bold focus:ring-0">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[240px] w-full flex items-end justify-between gap-2">
                    {[35, 45, 30, 60, 85, 95].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-primary/20 rounded-t-lg relative group transition-all" 
                          style={{ height: `${val}%` }}
                        >
                          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 rounded-t-lg transition-opacity" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₦{val * 100}k
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Monthly Target</p>
                      <p className="text-xl font-bold">₦10M</p>
                      <div className="w-full bg-muted h-1 rounded-full mt-2">
                        <div className="bg-primary h-full w-[12.5%]" />
                      </div>
                      <p className="text-[10px] mt-1 text-primary font-bold">12.5% Achieved</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Avg. Transaction</p>
                      <p className="text-xl font-bold">₦4.2M</p>
                      <p className="text-[10px] mt-1 text-green-600 font-bold">+5.2% vs Last Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Land Apps Section */}
            <LandAppsSection />
          </>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Active Verification Tasks</h2>
              <Button className="gap-2"><Plus className="h-4 w-4" /> New Task</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['To Do', 'In Progress', 'Done'].map(status => (
                <div key={status} className="bg-muted/50 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-sm uppercase tracking-wider">{status}</h3>
                    <Badge variant="secondary" className="h-5 px-1.5">{Math.floor(Math.random() * 5) + 1}</Badge>
                  </div>
                  {VERIFICATION_TASKS.map(task => (
                    <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:border-primary transition-colors">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Badge className="text-[10px] h-5" variant={task.priority === 'high' ? 'destructive' : 'outline'}>
                            {task.priority}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-bold">#{task.id}</span>
                        </div>
                        <p className="font-bold text-sm">{task.propertyTitle}</p>
                        <div className="flex items-center justify-between pt-2 border-t text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                              {task.assignedTo.charAt(0)}
                            </div>
                            <span className="font-medium">{task.assignedTo}</span>
                          </div>
                          <span className="text-muted-foreground font-bold">{task.dueDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-xl font-bold">Secure Document Manager</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export All</Button>
                <Button className="gap-2"><Upload className="h-4 w-4" /> Upload Document</Button>
              </div>
            </div>

            <div 
              className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl p-12 text-center space-y-4 cursor-pointer hover:bg-primary/10 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                toast.success('Document uploaded successfully!');
              }}
            >
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Drag & Drop Documents</h3>
                <p className="text-muted-foreground">Supports PDF, PNG, JPG (Max 10MB each)</p>
              </div>
              <Button variant="outline">Browse Files</Button>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Associated Property</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {[
                    { name: 'C_of_O_Lekki_P1.pdf', prop: 'Luxury 5 Bedroom Duplex', type: 'PDF', status: 'verified' },
                    { name: 'Survey_Plan_Ibeju.jpg', prop: 'Commercial Land Ibeju', type: 'JPG', status: 'pending' },
                    { name: 'Deed_of_Assignment.pdf', prop: 'Maitama Apartment', type: 'PDF', status: 'rejected' },
                  ].map((doc, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-bold">{doc.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.prop}</td>
                      <td className="px-6 py-4"><Badge variant="outline" className="text-[10px]">{doc.type}</Badge></td>
                      <td className="px-6 py-4">
                        <Badge variant={doc.status === 'verified' ? 'secondary' : doc.status === 'rejected' ? 'destructive' : 'outline'} className="capitalize text-[10px]">
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Manage Properties</h2>
                <p className="text-muted-foreground">View and manage all listed properties on the platform.</p>
              </div>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Add Property</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {PROPERTIES.map((property) => (
                <Card key={property.id} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.plotsAvailable && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                            <Sparkles className="h-3 w-3" />
                            {property.plotsAvailable} plots
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{property.title}</h3>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                          </div>
                          <Badge variant={property.status === 'available' ? 'secondary' : 'outline'} className="capitalize text-[10px] font-bold">
                            {property.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-primary font-bold text-lg">
                            ₦{property.price.toLocaleString()}
                            {property.priceLabel && <span className="text-muted-foreground text-xs font-normal">/{property.priceLabel}</span>}
                          </span>
                          {property.type && (
                            <span className="text-muted-foreground capitalize">{property.type}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 pt-2 border-t">
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Eye className="h-3.5 w-3.5" /> View
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <DollarSign className="h-3.5 w-3.5" /> Update Price
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                            <XCircle className="h-3.5 w-3.5" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <LandAppsSection />
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Leads & Inquiries</h2>
                <p className="text-muted-foreground">Onboarding requests collected from the "Get Started" flow.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="font-bold">{leads.length}</span> total leads
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary/40" />
                </div>
                <h3 className="text-lg font-bold text-muted-foreground">No leads yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Leads collected from the "Get Started" onboarding modal will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leads.map((lead, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow group">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {lead.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm">{lead.name || 'Anonymous'}</h3>
                            <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {lead.interest || 'General'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px] capitalize">
                          {new Date(lead.timestamp || lead.createdAt || Date.now()).toLocaleDateString()}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        {lead.email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                        {lead.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{lead.location}</span>
                          </div>
                        )}
                        {lead.preferredDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>Preferred: {new Date(lead.preferredDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {lead.message && (
                        <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-2">
                          <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                          <p className="line-clamp-2">{lead.message}</p>
                        </div>
                      )}

                      {lead.budget && (
                        <div className="flex items-center gap-2 text-sm font-bold text-primary">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>₦{lead.budget}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1">
                          <Mail className="h-3 w-3" /> Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            const updated = leads.filter((_, i) => i !== index);
                            setLeads(updated);
                            localStorage.setItem('land_trust_leads', JSON.stringify(updated));
                            toast.success('Lead removed');
                          }}
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;