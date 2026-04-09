"use client";

import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/editor/code-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import { useDict, useLocale } from "@/lib/i18n/context";

type Section = { type: "text" | "code" | "hint"; content: string };
type Lesson = {
  title_az: string;
  title_en: string;
  module: number;
  language: "html" | "css" | "javascript" | "python";
  xp: number;
  sections_az: Section[];
  sections_en: Section[];
  starterCode: string;
};

// Static lesson content — will come from Supabase
const LESSON_DATA: Record<string, Lesson> = {
  "1": {
    title_az: "Kompüter necə işləyir?",
    title_en: "How does a computer work?",
    module: 1,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "Kompüter — məlumatı qəbul edən, emal edən və nəticəni göstərən elektron maşındır. Hər kompüterdə üç əsas hissə var: giriş (klaviatura, siçan), emal (prosessor və yaddaş) və çıxış (ekran, səs)." },
      { type: "text", content: "Prosessor (CPU) kompüterin \"beynidir\". O, hər saniyədə milyardlarla əməliyyat yerinə yetirir. RAM isə qısa müddətli yaddaşdır — proqramlar işləyərkən məlumatı burada saxlayır." },
      { type: "text", content: "Kompüter yalnız 0 və 1 rəqəmlərini başa düşür. Buna ikili sistem (binary) deyilir. Bizim yazdığımız kod isə kompüterin anlayacağı bu dilə çevrilir." },
      { type: "hint", content: "İpucu: Telefonunuz, oyun konsolunuz və hətta ağıllı saatınız da kiçik kompüterlərdir!" },
    ],
    sections_en: [
      { type: "text", content: "A computer is an electronic machine that takes input, processes it, and produces output. Every computer has three main parts: input (keyboard, mouse), processing (CPU and memory), and output (screen, sound)." },
      { type: "text", content: "The processor (CPU) is the computer's \"brain\". It performs billions of operations per second. RAM is short-term memory — it stores data while programs are running." },
      { type: "text", content: "A computer only understands 0s and 1s. This is called the binary system. The code we write is translated into this language that the computer can understand." },
      { type: "hint", content: "Hint: Your phone, game console, and even your smartwatch are small computers too!" },
    ],
    starterCode: "<h1>Computer Parts</h1>\n<ul>\n  <li>CPU — the brain</li>\n  <li>RAM — short-term memory</li>\n  <li>Storage — long-term memory</li>\n</ul>",
  },
  "2": {
    title_az: "İnternet və veb səhifələr",
    title_en: "Internet and web pages",
    module: 1,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "İnternet — dünyanın hər yerindəki milyonlarla kompüteri bir-birinə bağlayan nəhəng şəbəkədir. Bu şəbəkə sayəsində biz mesajlar göndərir, video izləyir və veb saytlara daxil oluruq." },
      { type: "text", content: "Veb sayt bir və ya daha çox veb səhifədən ibarətdir. Hər veb səhifənin öz ünvanı (URL) var. Məsələn: https://acodemia.az" },
      { type: "text", content: "Brauzer (Chrome, Firefox, Safari) veb səhifələri göstərən proqramdır. Siz URL yazanda brauzer serverə sorğu göndərir və server səhifəni geri qaytarır." },
      { type: "code", content: "Siz → Brauzer → Server → Veb səhifə" },
      { type: "hint", content: "İpucu: HTTP və HTTPS veb protokollarıdır. HTTPS daha təhlükəsizdir, çünki məlumatı şifrələyir." },
    ],
    sections_en: [
      { type: "text", content: "The Internet is a huge network that connects millions of computers all over the world. Thanks to it, we can send messages, watch videos, and visit websites." },
      { type: "text", content: "A website consists of one or more web pages. Each web page has its own address (URL). For example: https://acodemia.az" },
      { type: "text", content: "A browser (Chrome, Firefox, Safari) is a program that displays web pages. When you type a URL, the browser sends a request to a server, and the server returns the page." },
      { type: "code", content: "You → Browser → Server → Web page" },
      { type: "hint", content: "Hint: HTTP and HTTPS are web protocols. HTTPS is more secure because it encrypts the data." },
    ],
    starterCode: "<h1>My Favorite Websites</h1>\n<ul>\n  <li>acodemia.az — learn coding</li>\n  <li>wikipedia.org — knowledge</li>\n</ul>",
  },
  "3": {
    title_az: "Məntiq və alqoritmlər",
    title_en: "Logic and algorithms",
    module: 1,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "Alqoritm — bir məsələni həll etmək üçün addım-addım təlimatdır. Səhər yeməyi hazırlamaq, dişləri fırçalamaq — bütün bunlar alqoritmdir!" },
      { type: "text", content: "Proqramlaşdırmada biz kompüterə nə edəcəyini alqoritm şəklində izah edirik. Yaxşı alqoritm aydın, qısa və düzgündür." },
      { type: "code", content: "Sendviç alqoritmi:\n1. Çörəyi götür\n2. İki tilim kəs\n3. Yağ sür\n4. Pendir qoy\n5. Bir-birinin üstünə qoy" },
      { type: "text", content: "Məntiq isə \"əgər... onda...\" kimi qərarlar verməyə kömək edir. Məsələn: Əgər yağış yağırsa, çətir götür." },
      { type: "hint", content: "İpucu: Hər gün etdiyiniz 3 alqoritmi yazmağa çalışın — məktəbə getmək, ev tapşırığı, oyun oynamaq." },
    ],
    sections_en: [
      { type: "text", content: "An algorithm is a step-by-step instruction to solve a problem. Making breakfast, brushing your teeth — all of these are algorithms!" },
      { type: "text", content: "In programming, we tell the computer what to do in the form of an algorithm. A good algorithm is clear, short, and correct." },
      { type: "code", content: "Sandwich algorithm:\n1. Take the bread\n2. Cut two slices\n3. Spread butter\n4. Add cheese\n5. Put slices together" },
      { type: "text", content: "Logic helps us make decisions like \"if... then...\". For example: If it's raining, take an umbrella." },
      { type: "hint", content: "Hint: Try writing down 3 algorithms you do every day — going to school, homework, playing a game." },
    ],
    starterCode: "<h1>My Morning Algorithm</h1>\n<ol>\n  <li>Wake up</li>\n  <li>Brush teeth</li>\n  <li>Eat breakfast</li>\n  <li>Go to school</li>\n</ol>",
  },
  "4": {
    title_az: 'İlk kodunuz: "Salam, Dünya!"',
    title_en: 'Your first code: "Hello, World!"',
    module: 1,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: 'Hər proqramçının ilk kodu "Salam, Dünya!" yazmaqdan başlayır. Bu dərsdə siz JavaScript dilində ilk kodunuzu yazacaqsınız.' },
      { type: "text", content: "`console.log()` funksiyası ekrana mətn yazmaq üçün istifadə edilir. Mötərizə içinə yazdığınız mətn ekranda görünəcək." },
      { type: "code", content: 'console.log("Salam, Dünya!");' },
      { type: "text", content: 'Yuxarıdakı kodu sağ tərəfdəki redaktora yazın və ▶ İcra et düyməsinə basın. Nəticə bölməsində "Salam, Dünya!" yazısını görəcəksiniz.' },
      { type: "hint", content: 'İpucu: Mətni dəyişdirməyi sınayın — məsələn, öz adınızı yazın: console.log("Salam, Aynur!");' },
    ],
    sections_en: [
      { type: "text", content: 'Every programmer\'s first code starts with writing "Hello, World!". In this lesson you will write your first code in JavaScript.' },
      { type: "text", content: "The `console.log()` function is used to print text to the screen. The text you write inside the parentheses will appear on screen." },
      { type: "code", content: 'console.log("Hello, World!");' },
      { type: "text", content: 'Write the code above in the editor on the right and press the ▶ Run button. You will see "Hello, World!" in the output section.' },
      { type: "hint", content: 'Hint: Try changing the text — for example, write your own name: console.log("Hello, Aynur!");' },
    ],
    starterCode: '// Write your first code here\nconsole.log("Hello, World!");',
  },
  "5": {
    title_az: "Dəyişənlər və verilən tipləri",
    title_en: "Variables and data types",
    module: 1,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "Dəyişən — məlumatı saxlamaq üçün istifadə edilən \"qutudur\". Hər dəyişənin adı və dəyəri var." },
      { type: "text", content: "JavaScript-də dəyişən yaratmaq üçün `let` və ya `const` açar sözlərindən istifadə edirik. `let` dəyişən dəyərlər üçün, `const` isə dəyişməz dəyərlər üçündür." },
      { type: "code", content: 'let ad = "Aynur";\nlet yas = 12;\nconst doguluYili = 2013;\n\nconsole.log(ad);\nconsole.log(yas);' },
      { type: "text", content: "Əsas verilən tipləri: mətn (string) — dırnaq içində yazılır, rəqəm (number), məntiqi (boolean) — true/false." },
      { type: "hint", content: "İpucu: Dəyişən adları anlamlı olmalıdır. `x` əvəzinə `telefonNomresi` yazın." },
    ],
    sections_en: [
      { type: "text", content: "A variable is a \"box\" used to store data. Every variable has a name and a value." },
      { type: "text", content: "In JavaScript we use `let` or `const` keywords to create a variable. `let` is for changing values, `const` is for constant values." },
      { type: "code", content: 'let name = "Aynur";\nlet age = 12;\nconst birthYear = 2013;\n\nconsole.log(name);\nconsole.log(age);' },
      { type: "text", content: "Main data types: text (string) — written in quotes, number (number), logical (boolean) — true/false." },
      { type: "hint", content: "Hint: Variable names should be meaningful. Write `phoneNumber` instead of `x`." },
    ],
    starterCode: '// Create variables about yourself\nlet name = "Your name";\nlet age = 12;\nlet favoriteColor = "blue";\n\nconsole.log(name, age, favoriteColor);',
  },
  "6": {
    title_az: "HTML nədir? İlk səhifəniz",
    title_en: "What is HTML? Your first page",
    module: 2,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "HTML (HyperText Markup Language) veb səhifələrin əsasını təşkil edən dildir. Bütün veb saytlar HTML ilə yazılır." },
      { type: "text", content: "HTML teqlər (tags) ilə işləyir. Hər teq < və > simvolları arasında yazılır. Məsələn, <h1> böyük başlıq, <p> isə paraqraf yaradır." },
      { type: "code", content: "<h1>Salam, Dünya!</h1>\n<p>Bu mənim ilk veb səhifəmdir.</p>" },
      { type: "hint", content: "İpucu: <h1> başlığı ən böyük başlıqdır. <h2>, <h3>... ilə daha kiçik başlıqlar yarada bilərsiniz." },
    ],
    sections_en: [
      { type: "text", content: "HTML (HyperText Markup Language) is the language that forms the foundation of web pages. All websites are written with HTML." },
      { type: "text", content: "HTML works with tags. Each tag is written between < and > symbols. For example, <h1> creates a big heading, and <p> creates a paragraph." },
      { type: "code", content: "<h1>Hello, World!</h1>\n<p>This is my first web page.</p>" },
      { type: "hint", content: "Hint: <h1> is the biggest heading. You can create smaller headings with <h2>, <h3>..." },
    ],
    starterCode: "<h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n\n<!-- Add your own text -->",
  },
  "7": {
    title_az: "Başlıqlar, paraqraflar, siyahılar",
    title_en: "Headings, paragraphs, lists",
    module: 2,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "HTML-də 6 səviyyə başlıq var: <h1>-dən <h6>-ya qədər. <h1> ən böyük, <h6> ən kiçikdir." },
      { type: "text", content: "Paraqraflar üçün <p> teqi istifadə olunur. Hər paraqraf yeni sətirdə başlayır." },
      { type: "text", content: "Siyahılar iki növdür: sıralı (<ol>) və sırasız (<ul>). Hər element <li> teqi ilə yazılır." },
      { type: "code", content: "<h1>Mənim hobbim</h1>\n<p>Mən kitab oxumağı sevirəm.</p>\n\n<h2>Sevimli kitablarım:</h2>\n<ul>\n  <li>Harry Potter</li>\n  <li>Balaca Şahzadə</li>\n</ul>" },
      { type: "hint", content: "İpucu: <ol> sıralı siyahı üçündür (1, 2, 3), <ul> sırasız siyahı üçündür (•)." },
    ],
    sections_en: [
      { type: "text", content: "HTML has 6 heading levels: from <h1> to <h6>. <h1> is the biggest, <h6> is the smallest." },
      { type: "text", content: "The <p> tag is used for paragraphs. Each paragraph starts on a new line." },
      { type: "text", content: "There are two types of lists: ordered (<ol>) and unordered (<ul>). Each item is written with the <li> tag." },
      { type: "code", content: "<h1>My hobby</h1>\n<p>I love reading books.</p>\n\n<h2>My favorite books:</h2>\n<ul>\n  <li>Harry Potter</li>\n  <li>The Little Prince</li>\n</ul>" },
      { type: "hint", content: "Hint: <ol> is for ordered lists (1, 2, 3), <ul> is for unordered lists (•)." },
    ],
    starterCode: "<h1>About me</h1>\n<p>Write something about yourself here.</p>\n\n<h2>My hobbies:</h2>\n<ul>\n  <li>Coding</li>\n  <li>Reading</li>\n</ul>",
  },
  "8": {
    title_az: "Şəkillər və keçidlər",
    title_en: "Images and links",
    module: 2,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "Şəkil əlavə etmək üçün <img> teqindən istifadə edirik. Bu teq bağlanmır və iki əsas atribut tələb edir: src (şəkil ünvanı) və alt (şəkil təsviri)." },
      { type: "code", content: '<img src="https://picsum.photos/300/200" alt="Təsadüfi şəkil">' },
      { type: "text", content: "Keçid (link) yaratmaq üçün <a> teqindən istifadə edirik. href atributu keçidin hara aparacağını göstərir." },
      { type: "code", content: '<a href="https://acodemia.az">Acodemia saytına keç</a>' },
      { type: "hint", content: "İpucu: alt atributu vacibdir — şəkil yüklənməsə bu mətn göstərilir və əlçatanlıq üçün lazımdır." },
    ],
    sections_en: [
      { type: "text", content: "We use the <img> tag to add an image. This tag doesn't close and needs two main attributes: src (image URL) and alt (image description)." },
      { type: "code", content: '<img src="https://picsum.photos/300/200" alt="Random image">' },
      { type: "text", content: "We use the <a> tag to create a link. The href attribute tells where the link goes." },
      { type: "code", content: '<a href="https://acodemia.az">Go to Acodemia</a>' },
      { type: "hint", content: "Hint: The alt attribute is important — it's shown if the image fails to load and it's needed for accessibility." },
    ],
    starterCode: '<h1>My gallery</h1>\n<img src="https://picsum.photos/400/250" alt="A nice picture">\n<p>\n  Visit <a href="https://acodemia.az">Acodemia</a> to learn more!\n</p>',
  },
  "9": {
    title_az: "CSS ilə rəngləndirmə",
    title_en: "Styling with CSS",
    module: 2,
    language: "css",
    xp: 50,
    sections_az: [
      { type: "text", content: "CSS (Cascading Style Sheets) veb səhifələri gözəl göstərmək üçün istifadə edilir. HTML strukturu qurur, CSS isə görünüşü bəzəyir." },
      { type: "text", content: "CSS qaydaları belə yazılır: seçici { xüsusiyyət: dəyər; }" },
      { type: "code", content: "h1 {\n  color: blue;\n  font-size: 32px;\n}\n\np {\n  color: gray;\n  font-family: Arial;\n}" },
      { type: "text", content: "Əsas xüsusiyyətlər: color (rəng), background-color (fon rəngi), font-size (mətn ölçüsü), text-align (mətn yerləşməsi)." },
      { type: "hint", content: "İpucu: Rəngləri ad (red, blue), hex (#ff0000) və ya rgb(255, 0, 0) formatında yaza bilərsiniz." },
    ],
    sections_en: [
      { type: "text", content: "CSS (Cascading Style Sheets) is used to make web pages look nice. HTML builds the structure, CSS decorates the look." },
      { type: "text", content: "CSS rules are written like this: selector { property: value; }" },
      { type: "code", content: "h1 {\n  color: blue;\n  font-size: 32px;\n}\n\np {\n  color: gray;\n  font-family: Arial;\n}" },
      { type: "text", content: "Main properties: color, background-color, font-size, text-align." },
      { type: "hint", content: "Hint: You can write colors as names (red, blue), hex (#ff0000), or rgb(255, 0, 0)." },
    ],
    starterCode: "body {\n  background-color: lightyellow;\n  font-family: Arial;\n}\n\nh1 {\n  color: purple;\n  text-align: center;\n}\n\np {\n  color: darkblue;\n  font-size: 18px;\n}",
  },
  "10": {
    title_az: "Öz veb səhifənizi yaradın",
    title_en: "Create your own web page",
    module: 2,
    language: "html",
    xp: 50,
    sections_az: [
      { type: "text", content: "İndi öyrəndiklərimizi birləşdirək! Bu dərsdə öz tanışlıq səhifənizi yaradacaqsınız." },
      { type: "text", content: "Səhifəniz bunları ehtiva etməlidir: başlıq, sizin haqqınızda paraqraf, hobbilərin siyahısı, bir şəkil və bir keçid." },
      { type: "code", content: '<h1>Salam, mən Aynur!</h1>\n<p>Mən 12 yaşındayam və kod yazmağı öyrənirəm.</p>\n<h2>Hobbilərim:</h2>\n<ul>\n  <li>Proqramlaşdırma</li>\n  <li>Şahmat</li>\n</ul>' },
      { type: "hint", content: "İpucu: Yaradıcı olun! Öz mətnlərinizi, şəkillərinizi və rənglərinizi istifadə edin." },
    ],
    sections_en: [
      { type: "text", content: "Now let's combine what we've learned! In this lesson you will create your own introduction page." },
      { type: "text", content: "Your page should include: a title, a paragraph about you, a list of hobbies, an image, and a link." },
      { type: "code", content: '<h1>Hi, I\'m Aynur!</h1>\n<p>I\'m 12 years old and I\'m learning to code.</p>\n<h2>My hobbies:</h2>\n<ul>\n  <li>Programming</li>\n  <li>Chess</li>\n</ul>' },
      { type: "hint", content: "Hint: Be creative! Use your own text, images, and colors." },
    ],
    starterCode: '<h1>Hi, I\'m [Your name]!</h1>\n<p>Write about yourself here.</p>\n\n<h2>My hobbies:</h2>\n<ul>\n  <li>Hobby 1</li>\n  <li>Hobby 2</li>\n</ul>\n\n<img src="https://picsum.photos/300/200" alt="Me">\n<p><a href="https://acodemia.az">My favorite site</a></p>',
  },
  "11": {
    title_az: "JavaScript nədir?",
    title_en: "What is JavaScript?",
    module: 3,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "JavaScript — veb səhifələri interaktiv edən proqramlaşdırma dilidir. HTML struktur, CSS görünüş, JavaScript isə davranış əlavə edir." },
      { type: "text", content: "JavaScript ilə siz düymələrə klikləndiyini izləyə, formaları yoxlaya, animasiyalar yarada və hətta oyunlar yaza bilərsiniz!" },
      { type: "code", content: 'alert("Salam!");\nconsole.log("Bu konsolda görünür");' },
      { type: "text", content: "`alert()` istifadəçiyə pəncərə göstərir, `console.log()` isə brauzer konsoluna yazır. Hər ikisi öyrənmə üçün faydalıdır." },
      { type: "hint", content: "İpucu: JavaScript Java ilə əlaqəli deyil! Adı oxşar olsa da, fərqli dillərdir." },
    ],
    sections_en: [
      { type: "text", content: "JavaScript is a programming language that makes web pages interactive. HTML adds structure, CSS adds appearance, and JavaScript adds behavior." },
      { type: "text", content: "With JavaScript you can respond to button clicks, validate forms, create animations, and even write games!" },
      { type: "code", content: 'alert("Hello!");\nconsole.log("This appears in the console");' },
      { type: "text", content: "`alert()` shows a popup to the user, while `console.log()` writes to the browser console. Both are useful for learning." },
      { type: "hint", content: "Hint: JavaScript is not related to Java! The names are similar, but they are different languages." },
    ],
    starterCode: '// Try both\nconsole.log("Learning JavaScript!");\n// alert("Hi there!");',
  },
  "12": {
    title_az: "Dəyişənlər və operatorlar",
    title_en: "Variables and operators",
    module: 3,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "Dəyişənlər məlumat saxlayır, operatorlar isə onlarla əməliyyat aparır. Riyazi operatorlar: +, -, *, /, %." },
      { type: "code", content: "let a = 10;\nlet b = 3;\n\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.33...\nconsole.log(a % b); // 1 (qalıq)" },
      { type: "text", content: "Müqayisə operatorları: ==, !=, >, <, >=, <=. Bunlar true və ya false qaytarır." },
      { type: "code", content: "let yas = 12;\nconsole.log(yas >= 10); // true\nconsole.log(yas == 15);  // false" },
      { type: "hint", content: "İpucu: Dəyəri müqayisə etmək üçün == əvəzinə === istifadə edin — o daha sərt və təhlükəsizdir." },
    ],
    sections_en: [
      { type: "text", content: "Variables store data, and operators perform actions on them. Math operators: +, -, *, /, %." },
      { type: "code", content: "let a = 10;\nlet b = 3;\n\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.33...\nconsole.log(a % b); // 1 (remainder)" },
      { type: "text", content: "Comparison operators: ==, !=, >, <, >=, <=. These return true or false." },
      { type: "code", content: "let age = 12;\nconsole.log(age >= 10); // true\nconsole.log(age == 15);  // false" },
      { type: "hint", content: "Hint: Use === instead of == to compare values — it is stricter and safer." },
    ],
    starterCode: "let price = 25;\nlet quantity = 4;\nlet total = price * quantity;\n\nconsole.log(\"Total:\", total);\nconsole.log(\"Is it expensive?\", total > 50);",
  },
  "13": {
    title_az: "Şərtlər (if/else)",
    title_en: "Conditions (if/else)",
    module: 3,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "Şərtlər kompüterə qərar verməyə kömək edir. \"Əgər bu doğrudursa, bunu et, əks halda onu et\"." },
      { type: "code", content: 'let yas = 12;\n\nif (yas >= 18) {\n  console.log("Böyüksən");\n} else {\n  console.log("Uşaqsan");\n}' },
      { type: "text", content: "Bir neçə şərt üçün else if istifadə edirik." },
      { type: "code", content: 'let qiymet = 85;\n\nif (qiymet >= 90) {\n  console.log("Əla");\n} else if (qiymet >= 70) {\n  console.log("Yaxşı");\n} else {\n  console.log("Çalışmaq lazımdır");\n}' },
      { type: "hint", content: "İpucu: && (və), || (və ya) operatorları ilə şərtləri birləşdirə bilərsiniz." },
    ],
    sections_en: [
      { type: "text", content: "Conditions help the computer make decisions. \"If this is true, do this, otherwise do that.\"" },
      { type: "code", content: 'let age = 12;\n\nif (age >= 18) {\n  console.log("You are an adult");\n} else {\n  console.log("You are a child");\n}' },
      { type: "text", content: "For multiple conditions we use else if." },
      { type: "code", content: 'let grade = 85;\n\nif (grade >= 90) {\n  console.log("Excellent");\n} else if (grade >= 70) {\n  console.log("Good");\n} else {\n  console.log("Needs practice");\n}' },
      { type: "hint", content: "Hint: You can combine conditions with && (and), || (or) operators." },
    ],
    starterCode: "let temperature = 22;\n\nif (temperature > 30) {\n  console.log(\"Hot!\");\n} else if (temperature > 15) {\n  console.log(\"Nice weather\");\n} else {\n  console.log(\"Cold!\");\n}",
  },
  "14": {
    title_az: "Dövrlər (for, while)",
    title_en: "Loops (for, while)",
    module: 3,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "Dövrlər eyni kodu bir neçə dəfə təkrar etməyə imkan verir. Eyni kodu 10 dəfə yazmaq əvəzinə, dövr yazırıq." },
      { type: "code", content: '// for dövrü: 1-dən 5-ə qədər\nfor (let i = 1; i <= 5; i++) {\n  console.log("Rəqəm:", i);\n}' },
      { type: "text", content: "while dövrü isə şərt doğru olduqca işləyir." },
      { type: "code", content: 'let say = 0;\nwhile (say < 3) {\n  console.log("Salam!");\n  say++;\n}' },
      { type: "hint", content: "İpucu: Diqqətli olun! Əgər while şərti heç vaxt yalan olmursa, sonsuz dövr yaranar və proqram donar." },
    ],
    sections_en: [
      { type: "text", content: "Loops let us repeat the same code multiple times. Instead of writing the same code 10 times, we write a loop." },
      { type: "code", content: '// for loop: from 1 to 5\nfor (let i = 1; i <= 5; i++) {\n  console.log("Number:", i);\n}' },
      { type: "text", content: "A while loop runs as long as a condition is true." },
      { type: "code", content: 'let count = 0;\nwhile (count < 3) {\n  console.log("Hello!");\n  count++;\n}' },
      { type: "hint", content: "Hint: Be careful! If a while condition never becomes false, you get an infinite loop and the program freezes." },
    ],
    starterCode: "// Print numbers 1 to 10\nfor (let i = 1; i <= 10; i++) {\n  console.log(i);\n}",
  },
  "15": {
    title_az: "Funksiyalar və hadisələr",
    title_en: "Functions and events",
    module: 3,
    language: "javascript",
    xp: 50,
    sections_az: [
      { type: "text", content: "Funksiya — adlandırılmış kod bloku. Bir dəfə yazırıq, istənilən qədər çağırırıq." },
      { type: "code", content: 'function salamla(ad) {\n  console.log("Salam, " + ad + "!");\n}\n\nsalamla("Aynur");\nsalamla("Elvin");' },
      { type: "text", content: "Funksiya dəyər də qaytara bilər — return açar sözü ilə." },
      { type: "code", content: "function topla(a, b) {\n  return a + b;\n}\n\nlet cavab = topla(5, 3);\nconsole.log(cavab); // 8" },
      { type: "hint", content: "İpucu: Yaxşı funksiya yalnız bir iş görür. Adı da nə etdiyini izah etməlidir." },
    ],
    sections_en: [
      { type: "text", content: "A function is a named block of code. We write it once and call it as many times as we want." },
      { type: "code", content: 'function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Aynur");\ngreet("Elvin");' },
      { type: "text", content: "A function can also return a value — with the return keyword." },
      { type: "code", content: "function add(a, b) {\n  return a + b;\n}\n\nlet answer = add(5, 3);\nconsole.log(answer); // 8" },
      { type: "hint", content: "Hint: A good function does only one thing. Its name should explain what it does." },
    ],
    starterCode: "function multiply(a, b) {\n  return a * b;\n}\n\nconsole.log(multiply(4, 5));\nconsole.log(multiply(10, 10));",
  },
  "16": {
    title_az: "Python nədir? Niyə Python?",
    title_en: "What is Python? Why Python?",
    module: 4,
    language: "python",
    xp: 50,
    sections_az: [
      { type: "text", content: "Python — sadə və güclü proqramlaşdırma dilidir. O, yeni başlayanlar üçün ideal sayılır, çünki sintaksisi ingilis dilinə yaxındır." },
      { type: "text", content: "Python süni intellekt, məlumat analizi, veb tətbiqlər, oyunlar və elmi araşdırmalarda geniş istifadə olunur." },
      { type: "code", content: 'print("Salam, Python!")\nprint("Mən Python öyrənirəm")' },
      { type: "text", content: "`print()` funksiyası ekrana mətn yazır. JavaScript-dəki `console.log()` ilə oxşardır." },
      { type: "hint", content: "İpucu: Python-da nöqtə-vergülə (;) ehtiyac yoxdur. Hər sətir avtomatik bitir." },
    ],
    sections_en: [
      { type: "text", content: "Python is a simple and powerful programming language. It is considered ideal for beginners because its syntax is close to English." },
      { type: "text", content: "Python is widely used in AI, data analysis, web apps, games, and scientific research." },
      { type: "code", content: 'print("Hello, Python!")\nprint("I am learning Python")' },
      { type: "text", content: "The `print()` function writes text to the screen. It is similar to `console.log()` in JavaScript." },
      { type: "hint", content: "Hint: In Python you don't need semicolons (;). Each line ends automatically." },
    ],
    starterCode: 'print("Hello, World!")\nprint("My name is ...")',
  },
  "17": {
    title_az: "Dəyişənlər və hesablamalar",
    title_en: "Variables and calculations",
    module: 4,
    language: "python",
    xp: 50,
    sections_az: [
      { type: "text", content: "Python-da dəyişən yaratmaq çox sadədir — sadəcə ad = dəyər yazırıq. Açar söz lazım deyil." },
      { type: "code", content: 'ad = "Aynur"\nyas = 12\nboy = 1.45\n\nprint(ad, yas, boy)' },
      { type: "text", content: "Python-da da +, -, *, / operatorları işləyir. Əlavə olaraq ** (qüvvət) və // (tam bölmə) var." },
      { type: "code", content: "a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a ** 2)  # 100 (10 qüvvət 2)\nprint(a // b)  # 3 (tam bölmə)" },
      { type: "hint", content: "İpucu: input() funksiyası ilə istifadəçidən məlumat ala bilərsiniz: ad = input(\"Adın nədir? \")" },
    ],
    sections_en: [
      { type: "text", content: "Creating a variable in Python is very simple — just write name = value. No keyword needed." },
      { type: "code", content: 'name = "Aynur"\nage = 12\nheight = 1.45\n\nprint(name, age, height)' },
      { type: "text", content: "Python also has +, -, *, / operators. It also has ** (power) and // (integer division)." },
      { type: "code", content: "a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a ** 2)  # 100 (10 to the power of 2)\nprint(a // b)  # 3 (integer division)" },
      { type: "hint", content: "Hint: You can get input from the user with input(): name = input(\"What is your name? \")" },
    ],
    starterCode: 'price = 25\nquantity = 4\ntotal = price * quantity\n\nprint("Total:", total)',
  },
  "18": {
    title_az: "Siyahılar və lüğətlər",
    title_en: "Lists and dictionaries",
    module: 4,
    language: "python",
    xp: 50,
    sections_az: [
      { type: "text", content: "Siyahı (list) bir neçə dəyəri bir yerdə saxlayır. Kvadrat mötərizələrdə yazılır." },
      { type: "code", content: 'meyveler = ["alma", "armud", "banan"]\nprint(meyveler[0])  # alma\nprint(len(meyveler))  # 3\n\nmeyveler.append("portağal")\nprint(meyveler)' },
      { type: "text", content: "Lüğət (dictionary) açar-dəyər cütlükləri saxlayır. Fiqurlu mötərizələrdə yazılır." },
      { type: "code", content: 'telebe = {\n  "ad": "Aynur",\n  "yas": 12,\n  "sinif": 7\n}\n\nprint(telebe["ad"])  # Aynur' },
      { type: "hint", content: "İpucu: İndekslər 0-dan başlayır! Birinci element list[0]-dır, list[1] deyil." },
    ],
    sections_en: [
      { type: "text", content: "A list stores multiple values together. It is written in square brackets." },
      { type: "code", content: 'fruits = ["apple", "pear", "banana"]\nprint(fruits[0])  # apple\nprint(len(fruits))  # 3\n\nfruits.append("orange")\nprint(fruits)' },
      { type: "text", content: "A dictionary stores key-value pairs. It is written in curly braces." },
      { type: "code", content: 'student = {\n  "name": "Aynur",\n  "age": 12,\n  "grade": 7\n}\n\nprint(student["name"])  # Aynur' },
      { type: "hint", content: "Hint: Indexes start from 0! The first element is list[0], not list[1]." },
    ],
    starterCode: 'colors = ["red", "green", "blue"]\nprint(colors)\nprint("First color:", colors[0])\n\nperson = {"name": "Alex", "age": 13}\nprint(person["name"])',
  },
  "19": {
    title_az: "Dövrlər və şərtlər",
    title_en: "Loops and conditions",
    module: 4,
    language: "python",
    xp: 50,
    sections_az: [
      { type: "text", content: "Python-da şərtlər if/elif/else açar sözləri ilə yazılır. Diqqət: Python-da girinti (boşluq) çox vacibdir!" },
      { type: "code", content: 'yas = 12\n\nif yas >= 18:\n    print("Böyüksən")\nelif yas >= 13:\n    print("Yeniyetməsən")\nelse:\n    print("Uşaqsan")' },
      { type: "text", content: "for dövrü ilə siyahının elementlərindən keçə bilərik." },
      { type: "code", content: 'meyveler = ["alma", "armud", "banan"]\nfor meyve in meyveler:\n    print(meyve)\n\nfor i in range(1, 6):\n    print(i)  # 1, 2, 3, 4, 5' },
      { type: "hint", content: "İpucu: Python-da { } əvəzinə girinti (4 boşluq) istifadə edirik. Bu vacibdir!" },
    ],
    sections_en: [
      { type: "text", content: "In Python, conditions are written with if/elif/else keywords. Note: indentation (spaces) is very important in Python!" },
      { type: "code", content: 'age = 12\n\nif age >= 18:\n    print("You are an adult")\nelif age >= 13:\n    print("You are a teenager")\nelse:\n    print("You are a child")' },
      { type: "text", content: "With a for loop we can go through list items." },
      { type: "code", content: 'fruits = ["apple", "pear", "banana"]\nfor fruit in fruits:\n    print(fruit)\n\nfor i in range(1, 6):\n    print(i)  # 1, 2, 3, 4, 5' },
      { type: "hint", content: "Hint: In Python we use indentation (4 spaces) instead of { }. This is important!" },
    ],
    starterCode: 'for i in range(1, 11):\n    if i % 2 == 0:\n        print(i, "is even")\n    else:\n        print(i, "is odd")',
  },
  "20": {
    title_az: "Mini layihə: Kalkulyator proqramı",
    title_en: "Mini project: Calculator program",
    module: 4,
    language: "python",
    xp: 50,
    sections_az: [
      { type: "text", content: "Təbrik edirik! İndi öyrəndiklərimizi birləşdirib sadə bir kalkulyator yaradacağıq. Bu layihə funksiyalar, şərtlər və dəyişənləri əhatə edir." },
      { type: "code", content: 'def topla(a, b):\n    return a + b\n\ndef cix(a, b):\n    return a - b\n\ndef vur(a, b):\n    return a * b\n\ndef bol(a, b):\n    if b == 0:\n        return "Sıfıra bölmək olmaz!"\n    return a / b\n\nprint(topla(10, 5))\nprint(cix(10, 5))\nprint(vur(10, 5))\nprint(bol(10, 5))' },
      { type: "text", content: "Hər funksiya bir əməliyyatı yerinə yetirir. Bölmə funksiyasında sıfıra bölmənin qarşısını aldığımıza diqqət edin." },
      { type: "hint", content: "İpucu: Proqramı genişləndirə bilərsiniz — qüvvət, kök, qalıq əlavə edin!" },
    ],
    sections_en: [
      { type: "text", content: "Congratulations! Now we'll combine what we've learned and create a simple calculator. This project covers functions, conditions, and variables." },
      { type: "code", content: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return "Cannot divide by zero!"\n    return a / b\n\nprint(add(10, 5))\nprint(subtract(10, 5))\nprint(multiply(10, 5))\nprint(divide(10, 5))' },
      { type: "text", content: "Each function performs one operation. Note how the divide function prevents division by zero." },
      { type: "hint", content: "Hint: You can extend the program — add power, square root, remainder!" },
    ],
    starterCode: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return "Cannot divide by zero!"\n    return a / b\n\n# Try your calculator\nprint("10 + 5 =", add(10, 5))\nprint("10 - 5 =", subtract(10, 5))\nprint("10 * 5 =", multiply(10, 5))\nprint("10 / 5 =", divide(10, 5))',
  },
};

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [completed, setCompleted] = useState(false);
  const dict = useDict();
  const locale = useLocale();
  const t = dict.lessons;
  const lesson = LESSON_DATA[lessonId];

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
        <p className="text-muted-foreground mb-6">{t.notFoundDesc}</p>
        <Link href={`/${locale}/lessons`}>
          <Button>{t.backToLessons}</Button>
        </Link>
      </div>
    );
  }

  const sections = locale === "az" ? lesson.sections_az : lesson.sections_en;
  const title = locale === "az" ? lesson.title_az : lesson.title_en;

  function handleComplete() {
    setCompleted(true);
    // TODO: Save progress to Supabase and award XP
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {t.module} {lesson.module} — {t.lesson} {lessonId}
          </p>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">+{lesson.xp} XP</Badge>
          {completed ? (
            <Badge className="bg-green-500">{t.completed}</Badge>
          ) : (
            <Button onClick={handleComplete}>{t.complete}</Button>
          )}
        </div>
      </div>

      {/* Content + Editor */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Lesson content */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <Card key={i} className="p-5">
              {section.type === "text" && (
                <p className="leading-relaxed">{section.content}</p>
              )}
              {section.type === "code" && (
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {section.content}
                </pre>
              )}
              {section.type === "hint" && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">{section.content}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Right: Code editor */}
        <div className="lg:sticky lg:top-20 h-[600px]">
          <CodeEditor
            language={lesson.language}
            defaultValue={lesson.starterCode}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link href={`/${locale}/lessons/${Number(lessonId) - 1}`}>
          <Button variant="outline" disabled={Number(lessonId) <= 1}>
            {t.prevLesson}
          </Button>
        </Link>
        <Link href={`/${locale}/lessons/${Number(lessonId) + 1}`}>
          <Button disabled={Number(lessonId) >= 20}>{t.nextLesson}</Button>
        </Link>
      </div>
    </div>
  );
}
