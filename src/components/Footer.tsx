"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Share2, Globe, Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Kryverzent Logo" width={32} height={32} />
            <span className="text-lg font-bold tracking-tighter uppercase">Kryverzent</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <MessageSquare className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Cpu className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Kryverzent Systems Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
