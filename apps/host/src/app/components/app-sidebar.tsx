import { Link, useLocation } from '@tanstack/react-router';

import { 
    LayoutDashboard, 
    CreditCard, 
    Network, 
    Wifi, 
    Settings
} from 'lucide-react';


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from '@mfe/ui';


const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Billing Service",
        url: "/billing",
        icon: CreditCard,
    },
    {
        title: "Wired Network",
        url: "/wired",
        icon: Network,
    },
    {
        title: "Wireless Mobile",
        url: "/wireless",
        icon: Wifi,
    },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-white/5">


            <SidebarHeader className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                            M
                        </div>
                        <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">MFE Portal</span>
                    </div>


                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={location.pathname === item.url}
                                        tooltip={item.title}
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
