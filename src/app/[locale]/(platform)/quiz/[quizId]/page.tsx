"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useDict, useLocale } from "@/lib/i18n/context";

// Sample quiz data — will come from Supabase
const QUIZ_DATA: Record<
  string,
  {
    title_az: string;
    title_en: string;
    timeLimit: number;
    questions: {
      question_az: string;
      question_en: string;
      options_az: string[];
      options_en: string[];
      correct: number;
      explanation_az: string;
      explanation_en: string;
    }[];
  }
> = {
  "1": {
    title_az: "Kompüterlər və Məntiq Quiz",
    title_en: "Computers & Logic Quiz",
    timeLimit: 300,
    questions: [
      {
        question_az: "Kompüterin əsas beyin hissəsi hansıdır?",
        question_en: "What is the main brain of a computer?",
        options_az: ["RAM", "CPU (Prosessor)", "Hard disk", "Monitor"],
        options_en: ["RAM", "CPU (Processor)", "Hard disk", "Monitor"],
        correct: 1,
        explanation_az: "CPU (Central Processing Unit) kompüterin əsas emal hissəsidir və bütün hesablamaları yerinə yetirir.",
        explanation_en: "CPU (Central Processing Unit) is the main processing part of a computer and performs all calculations.",
      },
      {
        question_az: "HTML nə üçün istifadə olunur?",
        question_en: "What is HTML used for?",
        options_az: ["Oyun yaratmaq", "Veb səhifə qurmaq", "Musiqi yazmaq", "Foto redaktə etmək"],
        options_en: ["Creating games", "Building web pages", "Writing music", "Editing photos"],
        correct: 1,
        explanation_az: "HTML (HyperText Markup Language) veb səhifələrin strukturunu yaratmaq üçün istifadə olunur.",
        explanation_en: "HTML (HyperText Markup Language) is used to create the structure of web pages.",
      },
      {
        question_az: "Aşağıdakılardan hansı proqramlaşdırma dili deyil?",
        question_en: "Which of the following is NOT a programming language?",
        options_az: ["Python", "JavaScript", "HTML", "Java"],
        options_en: ["Python", "JavaScript", "HTML", "Java"],
        correct: 2,
        explanation_az: "HTML bir markup (işarələmə) dilidir, proqramlaşdırma dili deyil.",
        explanation_en: "HTML is a markup language, not a programming language.",
      },
      {
        question_az: "1 baytda neçə bit var?",
        question_en: "How many bits are in 1 byte?",
        options_az: ["4", "8", "16", "32"],
        options_en: ["4", "8", "16", "32"],
        correct: 1,
        explanation_az: "1 bayt = 8 bit.",
        explanation_en: "1 byte = 8 bits.",
      },
      {
        question_az: "Alqoritm nədir?",
        question_en: "What is an algorithm?",
        options_az: ["Proqramlaşdırma dili", "Kompüter hissəsi", "Məsələni həll etmək üçün addım-addım təlimat", "İnternet brauzer"],
        options_en: ["A programming language", "A computer part", "Step-by-step instructions for solving a problem", "An internet browser"],
        correct: 2,
        explanation_az: "Alqoritm müəyyən bir məsələni həll etmək üçün ardıcıl addımlar toplusudur.",
        explanation_en: "An algorithm is a sequence of steps to solve a particular problem.",
      },
      {
        question_az: "Kompüter hansı say sistemindən istifadə edir?",
        question_en: "What number system does a computer use?",
        options_az: ["Onluq (10)", "İkili (0 və 1)", "Səkkizlik", "Onaltılıq"],
        options_en: ["Decimal (10)", "Binary (0 and 1)", "Octal", "Hexadecimal"],
        correct: 1,
        explanation_az: "Kompüterlər yalnız 0 və 1 rəqəmlərini, yəni ikili sistemi başa düşür.",
        explanation_en: "Computers only understand 0s and 1s — the binary system.",
      },
      {
        question_az: "RAM nədir?",
        question_en: "What is RAM?",
        options_az: ["Uzunmüddətli yaddaş", "Qısamüddətli (operativ) yaddaş", "Prosessor", "Ekran"],
        options_en: ["Long-term memory", "Short-term (operational) memory", "Processor", "Screen"],
        correct: 1,
        explanation_az: "RAM proqramlar işləyərkən məlumatı müvəqqəti saxlayan qısamüddətli yaddaşdır.",
        explanation_en: "RAM is short-term memory that temporarily stores data while programs run.",
      },
      {
        question_az: "Brauzer nədir?",
        question_en: "What is a browser?",
        options_az: ["Oyun proqramı", "Veb səhifələri göstərən proqram", "Antivirus", "Əməliyyat sistemi"],
        options_en: ["A game program", "A program that displays web pages", "An antivirus", "An operating system"],
        correct: 1,
        explanation_az: "Brauzer (Chrome, Firefox, Safari) veb səhifələri yükləyib göstərən proqramdır.",
        explanation_en: "A browser (Chrome, Firefox, Safari) is a program that loads and displays web pages.",
      },
      {
        question_az: "\"Əgər yağış yağırsa, çətir götür\" — bu nəyə misaldır?",
        question_en: "\"If it's raining, take an umbrella\" — this is an example of what?",
        options_az: ["Dövr", "Şərt (məntiq)", "Dəyişən", "Funksiya"],
        options_en: ["A loop", "A condition (logic)", "A variable", "A function"],
        correct: 1,
        explanation_az: "Bu bir şərt nümunəsidir — \"əgər... onda...\" strukturu.",
        explanation_en: "This is a conditional — the \"if... then...\" structure.",
      },
      {
        question_az: "İnternet nədir?",
        question_en: "What is the Internet?",
        options_az: ["Bir kompüter proqramı", "Dünya üzrə kompüterləri bağlayan şəbəkə", "Brauzer növü", "Yaddaş növü"],
        options_en: ["A computer program", "A worldwide network of computers", "A type of browser", "A type of memory"],
        correct: 1,
        explanation_az: "İnternet dünyadakı milyonlarla kompüteri bir-birinə bağlayan nəhəng şəbəkədir.",
        explanation_en: "The Internet is a huge network connecting millions of computers worldwide.",
      },
    ],
  },
  "2": {
    title_az: "HTML & CSS Quiz",
    title_en: "HTML & CSS Quiz",
    timeLimit: 360,
    questions: [
      {
        question_az: "HTML-də ən böyük başlıq hansı teqdir?",
        question_en: "Which is the largest heading tag in HTML?",
        options_az: ["<h6>", "<head>", "<h1>", "<header>"],
        options_en: ["<h6>", "<head>", "<h1>", "<header>"],
        correct: 2,
        explanation_az: "<h1> ən böyük, <h6> isə ən kiçik başlıqdır.",
        explanation_en: "<h1> is the largest and <h6> is the smallest heading.",
      },
      {
        question_az: "Paraqraf üçün hansı teq istifadə olunur?",
        question_en: "Which tag is used for a paragraph?",
        options_az: ["<para>", "<p>", "<text>", "<pg>"],
        options_en: ["<para>", "<p>", "<text>", "<pg>"],
        correct: 1,
        explanation_az: "<p> teqi paraqraf yaratmaq üçündür.",
        explanation_en: "The <p> tag is used to create a paragraph.",
      },
      {
        question_az: "Sırasız siyahı üçün hansı teq istifadə olunur?",
        question_en: "Which tag is used for an unordered list?",
        options_az: ["<ol>", "<ul>", "<li>", "<list>"],
        options_en: ["<ol>", "<ul>", "<li>", "<list>"],
        correct: 1,
        explanation_az: "<ul> sırasız siyahı, <ol> isə sıralı siyahı yaradır.",
        explanation_en: "<ul> creates an unordered list, <ol> an ordered one.",
      },
      {
        question_az: "Şəkil əlavə etmək üçün hansı teq istifadə olunur?",
        question_en: "Which tag is used to add an image?",
        options_az: ["<picture>", "<image>", "<img>", "<src>"],
        options_en: ["<picture>", "<image>", "<img>", "<src>"],
        correct: 2,
        explanation_az: "<img> teqi şəkil əlavə etmək üçündür və src atributu tələb edir.",
        explanation_en: "The <img> tag is used to add an image and requires a src attribute.",
      },
      {
        question_az: "Keçid (link) yaratmaq üçün hansı teq istifadə olunur?",
        question_en: "Which tag is used to create a link?",
        options_az: ["<link>", "<a>", "<href>", "<url>"],
        options_en: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1,
        explanation_az: "<a href=\"...\"> teqi keçid (link) yaratmaq üçündür.",
        explanation_en: "The <a href=\"...\"> tag is used to create a link.",
      },
      {
        question_az: "CSS nə üçün istifadə olunur?",
        question_en: "What is CSS used for?",
        options_az: ["Verilənlər bazası", "Səhifəni bəzəmək (stil)", "Server yaratmaq", "Animasiya çəkmək"],
        options_en: ["Databases", "Styling the page", "Creating servers", "Drawing animations"],
        correct: 1,
        explanation_az: "CSS (Cascading Style Sheets) HTML elementlərinə stil və görünüş vermək üçündür.",
        explanation_en: "CSS (Cascading Style Sheets) is used to style and visually present HTML elements.",
      },
      {
        question_az: "Mətnin rəngini dəyişmək üçün hansı CSS xüsusiyyəti istifadə olunur?",
        question_en: "Which CSS property changes the text color?",
        options_az: ["text-color", "font-color", "color", "background-color"],
        options_en: ["text-color", "font-color", "color", "background-color"],
        correct: 2,
        explanation_az: "`color` xüsusiyyəti mətnin rəngini təyin edir.",
        explanation_en: "The `color` property sets the text color.",
      },
      {
        question_az: "CSS-də fon rəngi hansı xüsusiyyətlə təyin olunur?",
        question_en: "Which CSS property sets the background color?",
        options_az: ["bg-color", "color", "background-color", "back-color"],
        options_en: ["bg-color", "color", "background-color", "back-color"],
        correct: 2,
        explanation_az: "`background-color` elementin fon rəngini təyin edir.",
        explanation_en: "`background-color` sets the background color of an element.",
      },
      {
        question_az: "HTML teqləri hansı simvollar arasında yazılır?",
        question_en: "HTML tags are written between which characters?",
        options_az: ["( )", "{ }", "< >", "[ ]"],
        options_en: ["( )", "{ }", "< >", "[ ]"],
        correct: 2,
        explanation_az: "HTML teqləri < və > simvolları arasında yazılır.",
        explanation_en: "HTML tags are written between < and > symbols.",
      },
      {
        question_az: "<img> teqində şəkil ünvanı hansı atributda yazılır?",
        question_en: "In which attribute is the image URL written in <img>?",
        options_az: ["href", "src", "link", "url"],
        options_en: ["href", "src", "link", "url"],
        correct: 1,
        explanation_az: "`src` (source) atributu şəkil ünvanını göstərir.",
        explanation_en: "The `src` (source) attribute holds the image URL.",
      },
      {
        question_az: "CSS qaydası necə yazılır?",
        question_en: "How is a CSS rule written?",
        options_az: ["selector { property: value; }", "selector: property = value", "property(selector, value)", "<selector property=value>"],
        options_en: ["selector { property: value; }", "selector: property = value", "property(selector, value)", "<selector property=value>"],
        correct: 0,
        explanation_az: "CSS qaydası: `selector { property: value; }` formatındadır.",
        explanation_en: "A CSS rule has the format: `selector { property: value; }`.",
      },
      {
        question_az: "Mətni mərkəzə düzmək üçün hansı xüsusiyyət istifadə olunur?",
        question_en: "Which property centers text?",
        options_az: ["align: center", "text-align: center", "center: true", "position: center"],
        options_en: ["align: center", "text-align: center", "center: true", "position: center"],
        correct: 1,
        explanation_az: "`text-align: center;` mətni mərkəzə düzür.",
        explanation_en: "`text-align: center;` centers the text.",
      },
    ],
  },
  "3": {
    title_az: "JavaScript Əsasları Quiz",
    title_en: "JavaScript Basics Quiz",
    timeLimit: 420,
    questions: [
      {
        question_az: "JavaScript-də dəyişən yaratmaq üçün hansı açar söz istifadə olunur?",
        question_en: "Which keyword is used to create a variable in JavaScript?",
        options_az: ["var, let, const", "dim", "variable", "int"],
        options_en: ["var, let, const", "dim", "variable", "int"],
        correct: 0,
        explanation_az: "JavaScript-də `let`, `const` və köhnə `var` istifadə olunur.",
        explanation_en: "JavaScript uses `let`, `const`, and the older `var`.",
      },
      {
        question_az: "Ekrana mətn yazmaq üçün hansı funksiya istifadə olunur?",
        question_en: "Which function is used to print text to the console?",
        options_az: ["print()", "echo()", "console.log()", "write()"],
        options_en: ["print()", "echo()", "console.log()", "write()"],
        correct: 2,
        explanation_az: "`console.log()` brauzer konsoluna mətn yazır.",
        explanation_en: "`console.log()` writes text to the browser console.",
      },
      {
        question_az: "Hansı operator bərabərliyi sərt şəkildə yoxlayır?",
        question_en: "Which operator checks strict equality?",
        options_az: ["=", "==", "===", "!="],
        options_en: ["=", "==", "===", "!="],
        correct: 2,
        explanation_az: "`===` həm dəyəri, həm də tipi yoxlayır — daha təhlükəsizdir.",
        explanation_en: "`===` checks both value and type — safer than `==`.",
      },
      {
        question_az: "`let x = 5; x = x + 1;` nəticə nədir?",
        question_en: "`let x = 5; x = x + 1;` — what is x?",
        options_az: ["5", "6", "51", "Xəta"],
        options_en: ["5", "6", "51", "Error"],
        correct: 1,
        explanation_az: "5 + 1 = 6.",
        explanation_en: "5 + 1 = 6.",
      },
      {
        question_az: "`const` ilə yaradılmış dəyişəni dəyişmək olar?",
        question_en: "Can a variable declared with `const` be reassigned?",
        options_az: ["Bəli, həmişə", "Xeyr, dəyişməzdir", "Yalnız bir dəfə", "Yalnız rəqəmlər üçün"],
        options_en: ["Yes, always", "No, it is constant", "Only once", "Only for numbers"],
        correct: 1,
        explanation_az: "`const` ilə təyin olunmuş dəyişənə yeni dəyər mənimsətmək olmaz.",
        explanation_en: "You cannot reassign a variable declared with `const`.",
      },
      {
        question_az: "Hansı dövr müəyyən sayda təkrar üçün ən uyğundur?",
        question_en: "Which loop is most suitable for a known number of repetitions?",
        options_az: ["while", "do-while", "for", "if"],
        options_en: ["while", "do-while", "for", "if"],
        correct: 2,
        explanation_az: "`for` dövrü təkrar sayı əvvəlcədən bilindiyi hallar üçündür.",
        explanation_en: "The `for` loop is best when the iteration count is known in advance.",
      },
      {
        question_az: "Funksiya necə təyin olunur?",
        question_en: "How do you define a function?",
        options_az: ["function ad() { }", "func ad() { }", "def ad(): ", "ad = function"],
        options_en: ["function ad() { }", "func ad() { }", "def ad(): ", "ad = function"],
        correct: 0,
        explanation_az: "`function ad() { ... }` sintaksisi istifadə olunur.",
        explanation_en: "The `function name() { ... }` syntax is used.",
      },
      {
        question_az: "`if` bloku içərisindəki kod nə vaxt işləyir?",
        question_en: "When does the code inside an `if` block run?",
        options_az: ["Həmişə", "Şərt true olduqda", "Şərt false olduqda", "Heç vaxt"],
        options_en: ["Always", "When the condition is true", "When the condition is false", "Never"],
        correct: 1,
        explanation_az: "`if` bloku yalnız şərt `true` olduqda işləyir.",
        explanation_en: "The `if` block only runs when the condition is `true`.",
      },
      {
        question_az: "`console.log(typeof \"Salam\");` nə qaytarır?",
        question_en: "`console.log(typeof \"Hello\");` — what does it return?",
        options_az: ["text", "string", "word", "char"],
        options_en: ["text", "string", "word", "char"],
        correct: 1,
        explanation_az: "Mətnin tipi JavaScript-də `string`-dir.",
        explanation_en: "In JavaScript, text has the type `string`.",
      },
      {
        question_az: "Massiv (array) necə yaradılır?",
        question_en: "How is an array created?",
        options_az: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<1, 2, 3>"],
        options_en: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<1, 2, 3>"],
        correct: 1,
        explanation_az: "Massivlər kvadrat mötərizələrlə yaradılır: `[1, 2, 3]`.",
        explanation_en: "Arrays are created with square brackets: `[1, 2, 3]`.",
      },
      {
        question_az: "`5 + \"5\"` JavaScript-də nə qaytarır?",
        question_en: "What does `5 + \"5\"` return in JavaScript?",
        options_az: ["10", "55", "Xəta", "undefined"],
        options_en: ["10", "\"55\"", "Error", "undefined"],
        correct: 1,
        explanation_az: "Rəqəm mətnlə birləşdirildikdə nəticə mətn olur: \"55\".",
        explanation_en: "When a number is added to a string, the result is a string: \"55\".",
      },
      {
        question_az: "`for (let i = 0; i < 3; i++)` neçə dəfə işləyir?",
        question_en: "How many times does `for (let i = 0; i < 3; i++)` run?",
        options_az: ["2", "3", "4", "Sonsuz"],
        options_en: ["2", "3", "4", "Infinite"],
        correct: 1,
        explanation_az: "i = 0, 1, 2 olmaqla 3 dəfə işləyir.",
        explanation_en: "It runs 3 times: i = 0, 1, 2.",
      },
      {
        question_az: "Massivin uzunluğunu necə tapırıq?",
        question_en: "How do we get an array's length?",
        options_az: ["arr.size", "arr.length", "len(arr)", "arr.count"],
        options_en: ["arr.size", "arr.length", "len(arr)", "arr.count"],
        correct: 1,
        explanation_az: "`arr.length` massivin elementlərinin sayını qaytarır.",
        explanation_en: "`arr.length` returns the number of elements in the array.",
      },
    ],
  },
  "4": {
    title_az: "Python Giriş Quiz",
    title_en: "Intro to Python Quiz",
    timeLimit: 450,
    questions: [
      {
        question_az: "Python-da ekrana mətn yazmaq üçün hansı funksiya istifadə olunur?",
        question_en: "Which function prints text to the screen in Python?",
        options_az: ["echo", "print", "console.log", "write"],
        options_en: ["echo", "print", "console.log", "write"],
        correct: 1,
        explanation_az: "`print()` funksiyası ekrana mətn yazır.",
        explanation_en: "The `print()` function writes text to the screen.",
      },
      {
        question_az: "Python-da dəyişən necə yaradılır?",
        question_en: "How is a variable created in Python?",
        options_az: ["var x = 5", "let x = 5", "x = 5", "int x = 5"],
        options_en: ["var x = 5", "let x = 5", "x = 5", "int x = 5"],
        correct: 2,
        explanation_az: "Python-da sadəcə `x = 5` yazmaq kifayətdir, açar söz lazım deyil.",
        explanation_en: "In Python, just `x = 5` is enough — no keyword needed.",
      },
      {
        question_az: "Hansı Python-da siyahı (list) nümunəsidir?",
        question_en: "Which is a Python list?",
        options_az: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<1, 2, 3>"],
        options_en: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<1, 2, 3>"],
        correct: 1,
        explanation_az: "Siyahılar kvadrat mötərizələrlə yaradılır: `[1, 2, 3]`.",
        explanation_en: "Lists are created with square brackets: `[1, 2, 3]`.",
      },
      {
        question_az: "Python-da şərt bloku nə ilə başlayır?",
        question_en: "A condition block in Python starts with which keyword?",
        options_az: ["when", "if", "check", "cond"],
        options_en: ["when", "if", "check", "cond"],
        correct: 1,
        explanation_az: "`if şərt:` şərt blokunu başladır.",
        explanation_en: "`if condition:` starts a condition block.",
      },
      {
        question_az: "Python-da kod blokları necə qruplaşdırılır?",
        question_en: "How are code blocks grouped in Python?",
        options_az: ["{ } ilə", "begin/end ilə", "Girinti (boşluq) ilə", "( ) ilə"],
        options_en: ["With { }", "With begin/end", "With indentation (spaces)", "With ( )"],
        correct: 2,
        explanation_az: "Python girintilərə (adətən 4 boşluq) əsasən kod bloklarını tanıyır.",
        explanation_en: "Python uses indentation (usually 4 spaces) to define code blocks.",
      },
      {
        question_az: "`len([1, 2, 3])` nə qaytarır?",
        question_en: "What does `len([1, 2, 3])` return?",
        options_az: ["2", "3", "6", "Xəta"],
        options_en: ["2", "3", "6", "Error"],
        correct: 1,
        explanation_az: "`len()` siyahıdakı elementlərin sayını qaytarır: 3.",
        explanation_en: "`len()` returns the number of items in the list: 3.",
      },
      {
        question_az: "Python-da şərh (comment) hansı simvolla başlayır?",
        question_en: "Which character starts a comment in Python?",
        options_az: ["//", "#", "/*", "--"],
        options_en: ["//", "#", "/*", "--"],
        correct: 1,
        explanation_az: "Python-da şərhlər `#` ilə başlayır.",
        explanation_en: "Comments start with `#` in Python.",
      },
      {
        question_az: "`range(1, 5)` hansı rəqəmləri verir?",
        question_en: "What numbers does `range(1, 5)` produce?",
        options_az: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "2, 3, 4, 5"],
        options_en: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "2, 3, 4, 5"],
        correct: 1,
        explanation_az: "`range(1, 5)` 1-dən 4-ə qədər (5 daxil deyil) rəqəmləri verir.",
        explanation_en: "`range(1, 5)` gives numbers from 1 to 4 (5 is excluded).",
      },
      {
        question_az: "Lüğət (dictionary) necə yaradılır?",
        question_en: "How is a dictionary created?",
        options_az: ["[key: value]", "{key: value}", "(key: value)", "<key=value>"],
        options_en: ["[key: value]", "{key: value}", "(key: value)", "<key=value>"],
        correct: 1,
        explanation_az: "Lüğətlər fiqurlu mötərizələrlə yaradılır: `{\"ad\": \"Aynur\"}`.",
        explanation_en: "Dictionaries use curly braces: `{\"name\": \"Aynur\"}`.",
      },
      {
        question_az: "Python-da funksiya necə təyin olunur?",
        question_en: "How is a function defined in Python?",
        options_az: ["function ad():", "def ad():", "func ad():", "define ad():"],
        options_en: ["function ad():", "def ad():", "func ad():", "define ad():"],
        correct: 1,
        explanation_az: "`def` açar sözü funksiya təyin etmək üçündür.",
        explanation_en: "The `def` keyword is used to define a function.",
      },
      {
        question_az: "`print(2 ** 3)` nə qaytarır?",
        question_en: "What does `print(2 ** 3)` output?",
        options_az: ["5", "6", "8", "23"],
        options_en: ["5", "6", "8", "23"],
        correct: 2,
        explanation_az: "`**` qüvvət operatorudur: 2³ = 8.",
        explanation_en: "`**` is the power operator: 2³ = 8.",
      },
      {
        question_az: "İstifadəçidən məlumat almaq üçün hansı funksiya istifadə olunur?",
        question_en: "Which function reads input from the user?",
        options_az: ["read()", "input()", "get()", "scan()"],
        options_en: ["read()", "input()", "get()", "scan()"],
        correct: 1,
        explanation_az: "`input()` istifadəçidən mətn daxil etməsini istəyir.",
        explanation_en: "`input()` prompts the user to enter text.",
      },
      {
        question_az: "Python-da indekslər hansı rəqəmdən başlayır?",
        question_en: "At which number do Python indexes start?",
        options_az: ["0", "1", "-1", "Hər dəfə fərqli"],
        options_en: ["0", "1", "-1", "Varies"],
        correct: 0,
        explanation_az: "Python-da (və əksər dillərdə) indekslər 0-dan başlayır.",
        explanation_en: "In Python (and most languages), indexes start at 0.",
      },
      {
        question_az: "Hansı tip Python-da mövcud deyil?",
        question_en: "Which type does NOT exist in Python?",
        options_az: ["int", "str", "float", "char"],
        options_en: ["int", "str", "float", "char"],
        correct: 3,
        explanation_az: "Python-da ayrıca `char` tipi yoxdur — tək simvol da `str`-dir.",
        explanation_en: "Python has no separate `char` type — a single character is still a `str`.",
      },
      {
        question_az: "`for item in [1, 2, 3]:` dövrü neçə dəfə işləyir?",
        question_en: "How many times does `for item in [1, 2, 3]:` run?",
        options_az: ["2", "3", "4", "Sonsuz"],
        options_en: ["2", "3", "4", "Infinite"],
        correct: 1,
        explanation_az: "Siyahıda 3 element var, dövr 3 dəfə işləyir.",
        explanation_en: "The list has 3 items, so the loop runs 3 times.",
      },
    ],
  },
};

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const dict = useDict();
  const locale = useLocale();
  const t = dict.quiz;
  const quiz = QUIZ_DATA[quizId];

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ?? 300);

  const finishQuiz = useCallback(() => {
    setFinished(true);
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, finished, timeLeft, finishQuiz]);

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
        <Link href={`/${locale}/quiz`}>
          <Button>{t.backToQuizzes}</Button>
        </Link>
      </div>
    );
  }

  const quizTitle = locale === "az" ? quiz.title_az : quiz.title_en;

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">{quizTitle}</h1>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>
            {quiz.questions.length} {t.questions}
          </span>
          <span>•</span>
          <span>
            {Math.floor(quiz.timeLimit / 60)} {t.minutes}
          </span>
        </div>
        <Button size="lg" onClick={() => setStarted(true)}>
          {t.startQuiz}
        </Button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const xpEarned =
      score === quiz.questions.length
        ? 100
        : Math.round(20 + (score / quiz.questions.length) * 80);
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">{t.quizCompleted}</h1>
        <div className="text-6xl font-bold text-primary">{percentage}%</div>
        <p className="text-lg">
          {t.correctAnswers
            .replace("{score}", String(score))
            .replace("{total}", String(quiz.questions.length))}
        </p>
        <Badge className="text-base px-4 py-1">
          {t.xpEarned.replace("{xp}", String(xpEarned))}
        </Badge>
        <div className="flex justify-center gap-3 pt-4">
          <Link href={`/${locale}/quiz`}>
            <Button variant="outline">{t.backToQuizzesBtn}</Button>
          </Link>
          <Link href={`/${locale}/dashboard`}>
            <Button>{t.toDashboard}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  const question = locale === "az" ? q.question_az : q.question_en;
  const options = locale === "az" ? q.options_az : q.options_en;
  const explanation = locale === "az" ? q.explanation_az : q.explanation_en;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress & timer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {t.questionOf
            .replace("{current}", String(currentQ + 1))
            .replace("{total}", String(quiz.questions.length))}
        </span>
        <Badge variant={timeLeft < 60 ? "destructive" : "outline"}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </Badge>
      </div>
      <Progress
        value={((currentQ + 1) / quiz.questions.length) * 100}
        className="h-2"
      />

      {/* Question */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">{question}</h2>
        <div className="space-y-3">
          {options.map((option, i) => {
            let style = "border-2 border-muted hover:border-primary/50";
            if (answered) {
              if (i === q.correct) style = "border-2 border-green-500 bg-green-50";
              else if (i === selected)
                style = "border-2 border-red-500 bg-red-50";
            } else if (i === selected) {
              style = "border-2 border-primary";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl transition-colors ${style}`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-4 bg-muted rounded-xl">
            <p className="text-sm">
              <strong>{t.explanation}</strong> {explanation}
            </p>
          </div>
        )}
      </Card>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {currentQ < quiz.questions.length - 1
              ? t.nextQuestion
              : t.finishQuiz}
          </Button>
        </div>
      )}
    </div>
  );
}
