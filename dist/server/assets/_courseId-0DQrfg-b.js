import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HardDrive, ChevronRight, LoaderCircle, AlertCircle, RefreshCw, Folder, FileText, File, ExternalLink, Download, ArrowLeft, BookOpen, Code2, FileQuestion, FolderOpen, ChevronDown, EyeOff, Eye } from "lucide-react";
import useSWR from "swr";
import { R as Route } from "./router-DJGNLVU_.js";
import "node:stream";
import "googleapis";
const fetcher = async (url) => {
  const response = await fetch(url);
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.error || "Files could not be loaded.");
    error.unconfigured = body.unconfigured;
    throw error;
  }
  return body;
};
function formatBytes(bytes) {
  if (bytes === null) return "Drive file";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = units[0];
  for (let index = 1; index < units.length && value >= 1024; index += 1) {
    value /= 1024;
    unit = units[index];
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${unit}`;
}
function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}
function DriveFileBrowser({ courseId, folderConfigured }) {
  const [folders, setFolders] = useState([
    { name: "Course files" }
  ]);
  const currentFolderId = folders.at(-1)?.id;
  const query = new URLSearchParams({ courseId });
  if (currentFolderId) query.set("folderId", currentFolderId);
  const { data, error, isLoading, mutate } = useSWR(
    folderConfigured ? `/api/drive/files?${query.toString()}` : null,
    fetcher,
    { keepPreviousData: false }
  );
  if (!folderConfigured) {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx(HardDrive, { className: "mx-auto h-8 w-8 text-blue-600" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-lg font-bold text-slate-900", children: "Connect this course folder" }),
      /* @__PURE__ */ jsxs("p", { className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600", children: [
        "Replace this course's placeholder ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-slate-100 px-1.5 py-0.5", children: "driveFolderId" }),
        " in ",
        /* @__PURE__ */ jsx("code", { className: "rounded bg-slate-100 px-1.5 py-0.5", children: "src/data/courses.ts" }),
        " with its Google Drive folder ID."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { "aria-labelledby": "drive-files-heading", className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { id: "drive-files-heading", className: "text-xl font-bold text-slate-900", children: "Course Files" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-slate-500", children: "Browse read-only folders. Regular files download here; Google files open in Drive preview." })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Folder breadcrumbs", className: "overflow-x-auto rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm", children: /* @__PURE__ */ jsx("ol", { className: "flex min-w-max items-center gap-1 text-sm", children: folders.map((folder, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1", children: [
      index > 0 && /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-slate-400" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setFolders((current) => current.slice(0, index + 1)),
          "aria-current": index === folders.length - 1 ? "page" : void 0,
          className: `rounded-lg px-2 py-1 font-medium transition-colors ${index === folders.length - 1 ? "text-slate-900" : "text-blue-600 hover:bg-slate-100"}`,
          children: folder.name
        }
      )
    ] }, `${folder.id ?? "root"}-${index}`)) }) }),
    isLoading && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-10 text-sm text-slate-500", children: [
      /* @__PURE__ */ jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
      "Loading files…"
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "mx-auto h-7 w-7 text-amber-700" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900", children: error.message }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => mutate(), className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700", children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" }),
        " Retry"
      ] })
    ] }),
    data && data.items.length === 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center", children: [
      /* @__PURE__ */ jsx(Folder, { className: "mx-auto h-8 w-8 text-slate-400" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-medium text-slate-600", children: "This folder is empty." })
    ] }),
    data && data.items.length > 0 && /* @__PURE__ */ jsx("ul", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", children: data.items.map((item) => {
      const Icon = item.isFolder ? Folder : item.isGoogleFile ? FileText : File;
      const actionLabel = item.isFolder ? `Open ${item.name}` : item.isGoogleFile ? `Preview ${item.name}` : `Download ${item.name}`;
      const content = /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: `flex h-10 w-10 flex-none items-center justify-center rounded-xl ${item.isFolder ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("span", { className: "block truncate font-semibold text-slate-900", children: item.name }),
          /* @__PURE__ */ jsxs("span", { className: "mt-0.5 block text-xs text-slate-500", children: [
            item.isFolder ? "Folder" : formatBytes(item.size),
            item.modifiedTime ? ` · ${formatDate(item.modifiedTime)}` : ""
          ] })
        ] }),
        item.isFolder ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5 flex-none text-slate-400" }) : item.isGoogleFile ? /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5 flex-none text-slate-400" }) : /* @__PURE__ */ jsx(Download, { className: "h-5 w-5 flex-none text-slate-400" })
      ] });
      return /* @__PURE__ */ jsx("li", { className: "border-b border-slate-100 last:border-b-0", children: item.isFolder ? /* @__PURE__ */ jsx("button", { type: "button", "aria-label": actionLabel, onClick: () => setFolders((current) => [...current, { id: item.id, name: item.name }]), className: "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50", children: content }) : /* @__PURE__ */ jsx(
        "a",
        {
          href: item.isGoogleFile ? item.webViewLink ?? "#" : `/api/drive/download/${encodeURIComponent(item.id)}?courseId=${encodeURIComponent(courseId)}`,
          target: item.isGoogleFile ? "_blank" : void 0,
          rel: item.isGoogleFile ? "noopener noreferrer" : void 0,
          "aria-label": actionLabel,
          className: "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50",
          children: content
        }
      ) }, item.id);
    }) })
  ] });
}
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
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1", role: "tablist", "aria-label": `${course.name} resources`, children: [
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
          /* @__PURE__ */ jsx("span", { children: "Questions" })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", role: "tab", "aria-selected": tab === "files", onClick: () => setTab("files"), className: `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:gap-2 sm:text-sm ${tab === "files" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(FolderOpen, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Files" })
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
      tab === "files" && /* @__PURE__ */ jsx(DriveFileBrowser, { courseId: course.id, folderConfigured: !course.driveFolderId.startsWith("REPLACE_WITH_") }),
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
