// This line brings in a tool that helps describe the website for search engines
import type { Metadata } from "next";
// These lines bring in two different text styles (fonts) to use on our website
import { Geist, Geist_Mono } from "next/font/google";
// This imports styling rules from another file to make our website look pretty
import "./globals.css";

// Here we're setting up the main text style (font) for regular text
// Think of this like choosing a handwriting style for your whole website
const geistSans = Geist({
  variable: "--font-geist-sans", // This gives the font a variable name we can use later
  subsets: ["latin"], // This makes sure we have letters for English and similar languages
});

// Here we're setting up a special text style for code or technical text
// This is like a typewriter-style text where each letter takes the same amount of space
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // This gives the font a name we can use later
  subsets: ["latin"], // This makes sure we have letters for English and similar languages
});

// This section provides basic information about our website
// Like the title and description you might see in Google search results
// export const metadata: Metadata = {
//   title: "SemiSolutionLLC", // The name of our website
//   description: "Semiconductor and IT equipment solutions", // A short description of what our website is about
// };

// This function creates the basic structure for EVERY page on our website
// Think of it like a template or the frame of a house - all pages will use this structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // "children" is where the specific content for each page will go
}>) {
  return (
    // This creates the main HTML structure of our website
    <html lang="en">
      {/* This is the visible part of our website */}
      <body
        // Here we're applying those text styles we set up earlier
        // "antialiased" makes the text look smoother on screens
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* This is where the content of each individual page will be inserted */}
        {/* It's like a placeholder that will be filled with different content for each page */}
        {children}
      </body>
    </html>
  );
}
