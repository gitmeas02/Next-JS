"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail } from "@/components/ui/sidebar";
import { ArchiveX, AudioWaveform, Command, Frame, GalleryVerticalEnd, Inbox, PieChart, Send, Settings2, Trash2, File, SquareTerminal, Bot, BookOpen, Map, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const data ={
    user:{
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    },
    navMain:[
        // group 1
    {
    title: "Inbox",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
    // group 2 dropdown
     {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "history",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
],
 teams: [
    {
      company_name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      company_name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      company_name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
mails:[
    {   
      id: "121232",
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      category: "Inbox",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      id: "121233",
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      category: "Inbox",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      id: "121234",
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      category: "Drafts",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      id: "121235",
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      category: "Drafts",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      id: "121236",
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      category: "Sent",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      id: "121237",
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      category: "Sent",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      id: "121238",
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      category: "Junk",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      id: "121239",
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      category: "Junk",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      id: "121240",
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      category: "Trash",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      id: "121241",
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      category: "Trash",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
]

}
export default function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>){
    const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
    const [isMailPanelOpen, setIsMailPanelOpen] = React.useState(false);
    const { mails } = data;
    
    // Filter mails based on active item
    const filteredMails = mails.filter(mail => mail.category === activeItem.title);
    
    // Handle clicking on mail items - toggle panel and set active item
    const handleMailItemClick = (item: typeof data.navMain[0]) => {
      setActiveItem(item);
      setIsMailPanelOpen(true);
    };

    return(
        <>
        <Sidebar
          collapsible="icon"
          className={isMailPanelOpen ? "hidden md:flex" : "flex"}
          {...props}
        >
            <SidebarHeader>
             {/*  Company Category */}
             <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
          
            <SidebarContent>
            {/* First 5 items: Inbox, Drafts, Sent, Junk, Trash */}
            <SidebarGroup>
                    <SidebarGroupLabel>Mail</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                           {data.navMain.slice(0, 5).map((item) => (
                            <SidebarMenuItem key={item.title}>
                             <SidebarMenuButton 
                               tooltip={item.title}
                               onClick={() => {
                                 if(activeItem.title === item.title && isMailPanelOpen){
                                   setIsMailPanelOpen(false);
                                 } else {
                                   handleMailItemClick(item);
                                 }
                               }}
                               isActive={activeItem.title === item.title}
                             >
                               {item.icon && <item.icon />}
                               <span>{item.title}</span>
                             </SidebarMenuButton>
                            </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
            </SidebarGroup>
                {/* Dropdown items: Playground, Models, Documentation, Settings */}
               <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {data.navMain.slice(5).map((item, index) => (
                        <Collapsible key={`${item.title}-${index}`} asChild defaultOpen={item.isActive}>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <a href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
           {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      {isMailPanelOpen && (
      <Sidebar collapsible="none" className="flex w-full md:w-80">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between ">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <button 
              onClick={() => setIsMailPanelOpen(false)}
              className="hover:bg-sidebar-accent rounded-md px-2 pt-0"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="flex w-full items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>          </div>          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent className="">
          <SidebarGroup className="px-0  overflow-y-auto">
            <SidebarGroupContent className="">
              {filteredMails.length > 0 ? filteredMails.map((mail) => (
                <a
                  href="#"
                  key={`${mail.id}-${mail.email}` }
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{" "}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-65 text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </a>
              )) : (
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                  <p>No {activeItem.title.toLowerCase()} messages</p>
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
         </Sidebar>
         )}
        </>
    )
}