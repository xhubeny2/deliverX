# **DeliverX**

## **Start**
Pro spuštění projektu použijte následující:
```
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Pro reset databáze a start od začátku:
```
npx prisma migrate reset
```

## **1\. Přehled Projektu**

**DeliverX** - platforma pro řízení logistiky navržená tak, aby propojila dispečery s řidiči. Je zaměřená na automatizaci denního plánování tras pomocí umělé inteligence (AI) a poskytuje bezproblémové, **mobile-first** prostředí pro řidiče v terénu.

Když jsem uvažoval nad tématem pro toto demo, chtěl jsem vytvořit něco praktického a nechtěl jsem dělat další TODO list.  Inspirací pro tento projekt byl rozhovor s mým kamarádem, který má obchod s autodíly a poskytuje jejich rozvoz. Všiml jsem si, že zatímco velké firmy jako Rohlík nebo DPD mají pokročilé systémy, menší firmy stále fungují na papíře, Excelu a telefonátech. Dispečer tráví ráno hodinu tím, že ručně skládá trasy, a řidič v terénu neustále volá, co má dělat.

Chtěl jsem vytvořit nástroj, který demokratizuje logistiku – dá malým firmám do ruky 'Enterprise' technologie (AI optimalizaci tras), ale v jednoduchém a rychlém kabátě."

Původní plán byl vytvořit backend pomocí Node.js/Express, ale Server Actions výrazně zjednodušily architekturu a myslím, že bych nebyl schopen dosáhnout stejné úrovně integrace a jednoduchosti s tradičním API.

Hlavní přidanou hodnotou je **AI Plánovač Tras**, který bere nepřiřazené zásilky a seskupuje je do optimálních jízd pro dostupné řidiče, přičemž respektuje klíčová omezení jako je délka směny (8 hodin) a startovní depo (Újezd 9, Prostějov, 79601).

## **2\. Použité Technologie (Tech Stack)**

### **Základní Framework a Jazyk**

* **React 18 + Next.js 15 (App Router)** - Dnes už asi standard pro React aplikace s podporou server-side renderingu, API routes a nových funkcí jako Server Actions.  
* **TypeScript**  - Pro typovou bezpečnost. Řekl bych, že dnes už téměř povinnost v profesionálním vývoji.

### **Datová Vrstva**

* **PostgreSQL (Neon.tech)** - Databáze v cloudu
* **Prisma ORM** - Typově bezpečný přístup k databázi, modelování schématu a migrace.  
* **Server Actions** - Vyřizování datových mutací přímo z komponent bez nutnosti vytvářet dedikované REST API endpointy.  
* **SWR** - Pro client-side data fetching a revalidaci, kde je okamžitá interaktivita

### **UI a UX**

* **Tailwind CSS** - Pro stylování a responzivní design.
* **shadcn/ui** - Předpřipravené komponenty pro rychlý vývoj.
* **Framer Motion / CSS Transitions** Pro plynulé animace (vyjíždění drawerů, přechody).  
* **nuqs:** Typově bezpečné řízení stavu pomocí URL parametrů (URL-driven UI).
* **zod, sonner, react-hook-form, date-fns, tanstack/react-table:** - Různé utility pro validaci, notifikace, formuláře, práci s daty a tabulky a další.

### **AI**

* **Google Gemini 2.5 Flash:** Použito pro seskupování a řazení zastávek na základě pochopení adres a uživatelských omezení. Lepší by bylo použití Google Routes API nebo nějaká specializovaná služba. Ale Gemini umožnilo rychlé demo.

## **3\. Klíčové Funkce a Technické Detaily**

### **A. AI Generování Tras**
Autentizovaná část aplikace.

Místo ručního přiřazování využívá systém specializovaný **AI Agent workflow**:

1. Načte všechny čekající (PENDING) zásilky a dostupné řidiče.  
2. Odešle strukturovaná data do **Gemini AI** s konkrétními omezeními (např. 8hodinový limit směny, adresa startovního depa).  
3. AI vrátí strukturovaný JSON návrh optimální trasy.  
4. Systém provede transakci pro vytvoření entity Run a propojí ji se zásilkami Deliveries.

**Technická Priorita:** Implementováno pomocí **Server Actions** s využitím globálního stavu (RunGenerationContext), který zajišťuje zpracování na pozadí a zasílá notifikace (Toasty) bez blokování uživatelského rozhraní.

### **B. Mobilní Aplikace pro Řidiče**
Neautentizovaná část aplikace, ale měla by být neveřejná a dostupná pouze pro konkrétního řidiče. Nestihl jsem ale zavést role.

pohled pro řidiče (/driver/\[id\]/run/\[id\]) je optimalizován pro dotykové obrazovky.

* **Funkce:** Řidiči mohou označit balíky jako Doručeno nebo Neúspěch jediným klepnutím.  
* **Technická Priorita:** **Optimistic UI (useOptimistic)**. Rozhraní se aktualizuje okamžitě po interakci uživatele, což zajišťuje odezvu jako u nativní aplikace, zatímco aktualizace databáze probíhá na pozadí.

### **C. Řízení Stavu Pomocí URL (URL-Driven State)**

K zajištění sdílení odkazů aplikace nevyužívá lokální stav pro klíčové prvky UI.

* **Implementace:** Pomocí knihovny nuqs je stav drawerů (např. ?action=generate\&driverId=123) synchronizován s URL.  
* **Výhoda:** Dispečer může sdílet konkrétní pohled nebo konfiguraci pouhým zkopírováním odkazu.

### **D. Optimalizace Výkonu**

* **Streaming & Suspense:** Klíčové části UI (statistiky Dashboardu, Tabulky) jsou obaleny do React Suspense s vlastními Skeletony, což zabraňuje vodopádovému načítání a posouvání obsahu (Layout Shift).  
* **Server-Side dotazy:** Náročné databázové operace jsou přesunuty na server/databázi, čímž se minimalizuje velikost klientského balíčku.

## **4\. Databázové Schéma (Zjednodušené)**

Aplikace má následující relační model:

* **Driver:** Jméno řidiče, informace o vozidle a stav.
* **Run:** Reprezentuje jednu jízdu/směnu. Propojuje Řidiče s více Zásilkami.  
* **Delivery:** Základní jednotka. Obsahuje adresu, příjemce, status (PENDING, IN\_TRANSIT, DELIVERED, FAILED) a volitelný index pořadí generovaný AI.

## **5\. Budoucí Plán Rozvoje**
Aplikace je určená pro demo účely a existuje mnoho možností pro zlepšení. Jako například:
* **Zákaznické rozhraní:** Přidání sekce pro sledování zásilek zákazníky.
* **Role a Autentizace:** Implementace rolí pro dispečery a řidiče s bezpečným přístupem.
* **Integrace Map a Geokódování:** Pro vizualizaci tras a optimalizaci na základě vzdálenosti.
* **Pokročilé AI Optimalizace:** Využití specializovaných služeb pro plánování tras.
