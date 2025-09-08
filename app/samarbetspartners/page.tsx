import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata = {
  title: "Samarbetspartners | CVfixaren.se",
  description: "Upptäck våra samarbetspartners som hjälper dig att ta nästa steg i din karriär. Från jobbsökning till kompetensutveckling.",
}

export default function SamarbetspartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Samarbetspartners", href: "/samarbetspartners" }]} />
        <h1 className="text-3xl font-bold mt-4 mb-6">Våra Samarbetspartners</h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Vi samarbetar med branschledande företag och organisationer för att erbjuda dig de bästa verktygen och resurserna för din karriärutveckling. Våra partners hjälper dig att inte bara skapa ett professionellt CV, utan också att ta nästa steg i din karriär.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Web Development & Digital Services */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://webbfix.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Webbfix
                  </a>
                </CardTitle>
                <Badge variant="secondary">Webb</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Professionella webblösningar och digital marknadsföring för företag och privatpersoner.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Skapa en stark digital närvaro som kompletterar ditt professionella CV.
              </p>
            </CardContent>
          </Card>

          {/* Housing & Real Estate */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://bostadscentralen.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Bostadscentralen
                  </a>
                </CardTitle>
                <Badge variant="secondary">Bostad</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Hitta rätt bostad när du tar nästa steg i din karriär och behöver flytta för jobbet.
              </CardDescription>
              <p className="text-sm text-gray-600">
                En trygg grund hemma ger dig stabilitet att fokusera på karriärutveckling.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://bostadshunden.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Bostadshunden
                  </a>
                </CardTitle>
                <Badge variant="secondary">Bostad</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Specialiserad bostadstjänst som hjälper dig hitta det perfekta hemmet.
              </CardDescription>
              <p className="text-sm text-gray-600">
                När karriären växer behöver du en bostad som matchar dina nya förutsättningar.
              </p>
            </CardContent>
          </Card>

          {/* Automotive Services */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://leasabegagnadbil.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Leasa Begagnad Bil
                  </a>
                </CardTitle>
                <Badge variant="secondary">Bil</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Flexibla billeasing-lösningar för dig som behöver transport till jobbet.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Pålitlig transport är viktigt för att komma till intervjuer och jobbet i tid.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://bilverkstadeskilstuna.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Bilverkstad Eskilstuna
                  </a>
                </CardTitle>
                <Badge variant="secondary">Service</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Professionell bilservice och reparationer för att hålla dig mobil.
              </CardDescription>
              <p className="text-sm text-gray-600">
                En välskött bil ger dig trygghet på vägen till nya karriärmöjligheter.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://mnbilvardscenter.se" target="_blank" className="text-[#00bf63] hover:underline">
                    MN Bilvårdscenter
                  </a>
                </CardTitle>
                <Badge variant="secondary">Bilvård</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Komplett bilvård som håller ditt fordon i toppskick för alla tillfällen.
              </CardDescription>
              <p className="text-sm text-gray-600">
                En välvårdad bil ger ett professionellt intryck vid affärsmöten och intervjuer.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://alunsmotor.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Aluns Motor
                  </a>
                </CardTitle>
                <Badge variant="secondary">Motor</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Specialiserad motorservice och expertis för alla typer av fordon.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Håll ditt fordon i perfekt skick för alla dina professionella resor.
              </p>
            </CardContent>
          </Card>

          {/* Construction & Technical Services */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://byggoplattsattning.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Bygg & Plattsättning
                  </a>
                </CardTitle>
                <Badge variant="secondary">Bygg</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Professionella bygg- och renoveringstjänster för hem och kontor.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Skapa den perfekta arbetsmiljön hemma för remote work och karriärutveckling.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://tornstrandelteknikab.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Törnstrand Elteknik AB
                  </a>
                </CardTitle>
                <Badge variant="secondary">El</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Expertis inom elinstallationer och tekniska lösningar för moderna arbetsplatser.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Säker och modern elinstallation för ditt hemmakontor eller företag.
              </p>
            </CardContent>
          </Card>

          {/* Specialized Services */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://seiko-mod.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Seiko Mod
                  </a>
                </CardTitle>
                <Badge variant="secondary">Klockor</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Exklusiva klockmodifieringar och service för den professionella looken.
              </CardDescription>
              <p className="text-sm text-gray-600">
                En stilfull klocka kompletterar din professionella image perfekt.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://dold-adress.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Dold Adress
                  </a>
                </CardTitle>
                <Badge variant="secondary">Säkerhet</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Skydda din integritet och säkerhet i den digitala karriärvärlden.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Viktigt att skydda din personliga information när du söker jobb online.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  <a href="https://fairing.se" target="_blank" className="text-[#00bf63] hover:underline">
                    Fairing
                  </a>
                </CardTitle>
                <Badge variant="secondary">Design</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Kreativa designlösningar som hjälper dig att sticka ut professionellt.
              </CardDescription>
              <p className="text-sm text-gray-600">
                Bra design är viktigt både för ditt CV och din professionella presentation.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Varför samarbetar vi?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">För dig som användare</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Tillgång till fler resurser och verktyg</li>
                <li>Expertkunskap från branschspecialister</li>
                <li>Holistisk approach till karriärutveckling</li>
                <li>Exklusiva erbjudanden och rabatter</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Vår vision</h3>
              <p className="text-gray-700">
                Vi tror på att skapa ett ekosystem där alla delar av din karriärresa hänger ihop. 
                Genom våra partnerskap kan vi erbjuda en komplett lösning - från CV-skapande till 
                din nästa drömjobb.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Vill du bli partner?</h2>
          <p className="text-gray-700 mb-6">
            Är du intresserad av att samarbeta med oss? Vi letar alltid efter nya partners som delar vår vision om att hjälpa människor i deras karriärutveckling.
          </p>
          <Link 
            href="/kontakt" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#00bf63] text-white hover:bg-[#00a857] h-10 px-4 py-2"
          >
            Kontakta oss för partnerskap
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
