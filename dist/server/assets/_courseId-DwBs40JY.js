import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Code2, FileQuestion, ChevronDown, Download, EyeOff, Eye } from "lucide-react";
import { R as Route } from "./router-D-ryxS71.js";
function CourseDetailPage() {
  const course = Route.useLoaderData();
  const [tab, setTab] = useState("lessons");
  const [openLesson, setOpenLesson] = useState(course.lessons[0]?.id ?? null);
  const [revealed, setRevealed] = useState({});
  const toggleAnswer = (id) => setRevealed((prev) => ({
    ...prev,
    [id]: !prev[id]
  }));
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pb-24 sm:pb-10", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back to Home"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-2xl font-extrabold tracking-tight text-slate-900", children: course.name }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: course.yearSemester }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1", role: "tablist", "aria-label": `${course.name} resources`, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": tab === "lessons", onClick: () => setTab("lessons"), className: `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${tab === "lessons" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Lessons & Notes" })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": tab === "programs", onClick: () => setTab("programs"), className: `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${tab === "programs" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(Code2, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Programs" })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": tab === "questions", onClick: () => setTab("questions"), className: `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${tab === "questions" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(FileQuestion, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Question Bank" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-3xl px-5 py-6", children: [
      tab === "lessons" && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: course.lessons.map((lesson) => {
        const isOpen = openLesson === lesson.id;
        return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", "aria-expanded": isOpen, onClick: () => setOpenLesson(isOpen ? null : lesson.id), className: "flex w-full items-center justify-between gap-3 px-5 py-4 text-left", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: lesson.title }),
            /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
          ] }),
          isOpen && /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 px-5 py-4", children: [
            /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: lesson.concepts.map((concept) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-sm leading-relaxed text-slate-600", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" }),
              concept
            ] }, concept)) }),
            /* @__PURE__ */ jsxs("a", { href: lesson.notesUrl, className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto", children: [
              /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
              "Download / View Lecture Notes"
            ] })
          ] })
        ] }, lesson.id);
      }) }),
      tab === "programs" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-900", children: "Practice Programs" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-slate-500", children: "Starter examples for practice. More programs can be added here later." })
        ] }),
        course.programs.map((program) => /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900", children: program.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-slate-600", children: program.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-slate-200 bg-slate-900 p-4", children: /* @__PURE__ */ jsx("pre", { className: "overflow-x-auto text-sm leading-relaxed text-slate-100", children: /* @__PURE__ */ jsx("code", { children: program.code }) }) })
        ] }, program.id))
      ] }),
      tab === "questions" && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: course.categories.map((category) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-sm font-bold uppercase tracking-wide text-slate-400", children: category.title }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: category.questions.map((question) => {
          const isRevealed = !!revealed[question.id];
          return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium leading-relaxed text-slate-900", children: question.question }),
              question.important && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700", children: "Important" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", "aria-expanded": isRevealed, onClick: () => toggleAnswer(question.id), className: "mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200", children: isRevealed ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(EyeOff, { className: "h-3.5 w-3.5" }),
              "Hide Answer"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
              "Show Answer"
            ] }) }),
            isRevealed && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600", children: question.answer })
          ] }, question.id);
        }) })
      ] }, category.id)) })
    ] })
  ] });
}
export {
  CourseDetailPage as component
};
