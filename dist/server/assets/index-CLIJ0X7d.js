import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { GraduationCap, FlaskConical, BookOpen, ArrowRight } from "lucide-react";
import { a as academicYear, c as collegeName, b as courses } from "./router-D-ryxS71.js";
const colorStyles = {
  blue: {
    icon: "text-blue-600 bg-blue-50",
    ring: "group-hover:ring-blue-200",
    tag: "bg-blue-50 text-blue-700"
  },
  indigo: {
    icon: "text-indigo-600 bg-indigo-50",
    ring: "group-hover:ring-indigo-200",
    tag: "bg-indigo-50 text-indigo-700"
  },
  teal: {
    icon: "text-teal-600 bg-teal-50",
    ring: "group-hover:ring-teal-200",
    tag: "bg-teal-50 text-teal-700"
  }
};
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-slate-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 py-10 sm:py-14", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold uppercase tracking-wide text-blue-600", children: [
          "Academic Year ",
          academicYear
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900", children: collegeName }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xl text-slate-500 text-base sm:text-lg", children: "Everything you need for lessons, notes, and exam preparation — organized in one place." })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-6xl px-5 py-8 sm:py-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-900 mb-4", children: "Your Courses" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: courses.map((course) => {
        const styles = colorStyles[course.color];
        const Icon = course.type === "practical" ? FlaskConical : BookOpen;
        return /* @__PURE__ */ jsxs(Link, { to: "/courses/$courseId", params: {
          courseId: course.id
        }, className: `group flex flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm ring-1 ring-transparent transition-all hover:shadow-md ${styles.ring} active:scale-[0.99]`, children: [
          /* @__PURE__ */ jsx("div", { className: `inline-flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("span", { className: `mt-4 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${styles.tag}`, children: course.yearSemester }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 text-xl font-bold text-slate-900", children: course.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-500 flex-1", children: course.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors", children: [
            "View course",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
          ] })
        ] }, course.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-6xl px-5 pb-10 pt-4 text-center text-xs text-slate-400", children: "Built for quick, mobile-friendly studying — tap any course to get started." })
  ] });
}
export {
  HomePage as component
};
