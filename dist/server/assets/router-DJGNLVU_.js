import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Readable } from "node:stream";
import { google } from "googleapis";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Student's Study Hub"
      },
      {
        name: "description",
        content: "Lessons, notes, and question banks for OOPS, DBMS, and DBMS Lab."
      }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-slate-50 text-slate-800 antialiased", children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./index-BtrDKTK2.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const academicYear = "2026 - 2027";
const collegeName = "Student's Study Hub";
const courses = [
  {
    id: "data-structures",
    name: "OOPS",
    type: "theory",
    yearSemester: "2nd Year · Semester 3",
    description: "Object-oriented programming with classes, inheritance, polymorphism, abstraction, and practical examples.",
    color: "blue",
    lessons: [
      {
        id: "oops-1",
        title: "Lesson 1: Classes & Objects",
        concepts: [
          "Defining classes, objects, attributes, and methods",
          "Access modifiers and encapsulation",
          "Constructors and object initialization",
          "Real-world object modeling"
        ],
        notesUrl: "#"
      },
      {
        id: "oops-2",
        title: "Lesson 2: Inheritance",
        concepts: [
          "Base and derived classes",
          "Single, multilevel, and hierarchical inheritance",
          "Method overriding and the super keyword",
          "Benefits and limitations of inheritance"
        ],
        notesUrl: "#"
      },
      {
        id: "oops-3",
        title: "Lesson 3: Polymorphism",
        concepts: [
          "Compile-time and runtime polymorphism",
          "Method overloading and method overriding",
          "Dynamic method dispatch",
          "Interfaces and polymorphic behavior"
        ],
        notesUrl: "#"
      },
      {
        id: "oops-4",
        title: "Lesson 4: Abstraction & Interfaces",
        concepts: [
          "Abstract classes and abstract methods",
          "Designing and implementing interfaces",
          "Abstraction versus encapsulation",
          "Building loosely coupled applications"
        ],
        notesUrl: "#"
      },
      {
        id: "oops-5",
        title: "Lesson 5: Exception Handling & File I/O",
        concepts: [
          "Handling exceptions with try, catch, and finally",
          "Creating custom exceptions",
          "Reading from and writing to files",
          "Resource management best practices"
        ],
        notesUrl: "#"
      }
    ],
    programs: [
      {
        id: "oops-program-1",
        title: "Student Class",
        description: "Create a class with a constructor and a method to display student details.",
        code: `class Student {
  constructor(name, rollNumber) {
    this.name = name
    this.rollNumber = rollNumber
  }

  display() {
    return \`${"${this.rollNumber}"} - ${"${this.name}"}\`
  }
}`
      },
      {
        id: "oops-program-2",
        title: "Shape Polymorphism",
        description: "Override a common area method in different shape classes.",
        code: `class Shape {
  area() { return 0 }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  area() { return this.width * this.height }
}`
      }
    ],
    driveFolderId: "REPLACE_WITH_OOPS_FOLDER_ID",
    categories: [
      {
        id: "ds-cat-1",
        title: "Arrays & Linked Lists",
        questions: [
          {
            id: "ds-q1",
            question: "Explain the difference between an array and a linked list with their time complexities.",
            answer: "Arrays offer O(1) random access but O(n) insertion/deletion (due to shifting). Linked lists offer O(1) insertion/deletion at a known node but O(n) access since traversal is required. Arrays use contiguous memory; linked lists use scattered memory with pointers.",
            important: true
          },
          {
            id: "ds-q2",
            question: "Write an algorithm to reverse a singly linked list.",
            answer: "Maintain three pointers: prev = null, curr = head, next = null. Traverse the list, at each node set next = curr.next, curr.next = prev, prev = curr, curr = next. When curr is null, prev is the new head.",
            important: true
          },
          {
            id: "ds-q3",
            question: "What is a circular linked list and where is it used?",
            answer: "A circular linked list has its last node pointing back to the first node instead of null. Used in round-robin scheduling, buffering, and multiplayer games where the turn cycles continuously."
          }
        ]
      },
      {
        id: "ds-cat-2",
        title: "Stacks, Queues & Trees",
        questions: [
          {
            id: "ds-q4",
            question: "How is a stack used to check balanced parentheses in an expression?",
            answer: "Push opening brackets onto the stack. On encountering a closing bracket, pop and check if it matches the corresponding opening bracket. If the stack is empty at the end and all matches succeeded, the expression is balanced.",
            important: true
          },
          {
            id: "ds-q5",
            question: "Differentiate between inorder, preorder, and postorder tree traversal.",
            answer: "Inorder (left, root, right) gives sorted order for a BST. Preorder (root, left, right) is used to copy a tree. Postorder (left, right, root) is used to delete a tree or evaluate postfix expressions."
          }
        ]
      }
    ]
  },
  {
    id: "database-systems",
    name: "Database Management Systems",
    type: "theory",
    yearSemester: "3rd Year · Semester 5",
    description: "Relational models, SQL, normalization, transactions, and indexing for real-world database design.",
    color: "indigo",
    lessons: [
      {
        id: "dbms-1",
        title: "Lesson 1: Relational Model & ER Diagrams",
        concepts: [
          "Entities, attributes, and relationships",
          "Mapping ER diagrams to relational schemas",
          "Keys: primary, candidate, foreign, composite",
          "Cardinality and participation constraints"
        ],
        notesUrl: "#"
      },
      {
        id: "dbms-2",
        title: "Lesson 2: SQL & Normalization",
        concepts: [
          "DDL, DML, and DQL commands",
          "Joins: inner, outer, left, right",
          "1NF, 2NF, 3NF, and BCNF explained with examples",
          "Functional dependencies and anomalies"
        ],
        notesUrl: "#"
      },
      {
        id: "dbms-3",
        title: "Lesson 3: Transactions & Concurrency",
        concepts: [
          "ACID properties",
          "Schedules: serial, serializable, conflict-serializable",
          "Locking protocols and deadlock handling",
          "Indexing basics: B+ trees and hashing"
        ],
        notesUrl: "#"
      },
      {
        id: "dbms-4",
        title: "Lesson 4: Indexing & Query Optimization",
        concepts: [
          "Primary, secondary, clustered, and non-clustered indexes",
          "B+ tree and hash indexing",
          "Query execution plans and cost estimation",
          "Improving queries with appropriate indexes"
        ],
        notesUrl: "#"
      },
      {
        id: "dbms-5",
        title: "Lesson 5: Security & Recovery",
        concepts: [
          "User roles, privileges, and access control",
          "Database backup strategies",
          "Log-based recovery and checkpoints",
          "Protecting data from common security threats"
        ],
        notesUrl: "#"
      }
    ],
    programs: [
      {
        id: "dbms-program-1",
        title: "Student Enrollment Query",
        description: "Join students and enrollments to list each student with their registered course.",
        code: `SELECT s.name, e.course_name
FROM students AS s
INNER JOIN enrollments AS e
  ON s.id = e.student_id
ORDER BY s.name;`
      },
      {
        id: "dbms-program-2",
        title: "Department Summary",
        description: "Group employees by department and calculate average salaries.",
        code: `SELECT department_id,
       COUNT(*) AS employee_count,
       AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 1;`
      }
    ],
    driveFolderId: "REPLACE_WITH_DBMS_FOLDER_ID",
    categories: [
      {
        id: "dbms-cat-1",
        title: "Relational Model & SQL",
        questions: [
          {
            id: "dbms-q1",
            question: "What is normalization? Explain 1NF, 2NF, and 3NF with an example.",
            answer: "1NF requires atomic values with no repeating groups. 2NF requires 1NF plus no partial dependency on a composite key. 3NF requires 2NF plus no transitive dependency on non-key attributes. Example: splitting a student-course table so course details depend only on course_id, not student_id.",
            important: true
          },
          {
            id: "dbms-q2",
            question: "Differentiate between INNER JOIN and LEFT JOIN with an example query.",
            answer: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table and matched rows from the right, filling NULL where there is no match. Example: SELECT * FROM Students LEFT JOIN Enrollments ON Students.id = Enrollments.student_id.",
            important: true
          }
        ]
      },
      {
        id: "dbms-cat-2",
        title: "Transactions & Indexing",
        questions: [
          {
            id: "dbms-q3",
            question: "Explain the ACID properties of a transaction.",
            answer: "Atomicity ensures all-or-nothing execution. Consistency ensures the database moves between valid states. Isolation ensures concurrent transactions do not interfere. Durability ensures committed changes survive system failure.",
            important: true
          },
          {
            id: "dbms-q4",
            question: "What is a deadlock and how can it be prevented?",
            answer: "A deadlock occurs when two or more transactions wait indefinitely for locks held by each other. It can be prevented using timeout mechanisms, wait-die/wound-wait schemes, or by acquiring locks in a fixed global order."
          },
          {
            id: "dbms-q5",
            question: "Why are B+ trees preferred over binary search trees for database indexing?",
            answer: "B+ trees have a high branching factor, keeping the tree shallow and reducing disk I/O. All data resides in leaf nodes linked sequentially, which makes range queries very efficient compared to a binary search tree."
          }
        ]
      }
    ]
  },
  {
    id: "dbms-lab",
    name: "DBMS Lab",
    type: "practical",
    yearSemester: "3rd Year · Semester 5",
    description: "Hands-on SQL programming, PL/SQL procedures, and database design exercises in the lab.",
    color: "teal",
    lessons: [
      {
        id: "lab-1",
        title: "Experiment 1: DDL & DML Basics",
        concepts: [
          "Creating tables with constraints (PK, FK, CHECK, UNIQUE)",
          "Inserting, updating, and deleting records",
          "ALTER TABLE operations",
          "Sample lab task: design a Library Management schema"
        ],
        notesUrl: "#"
      },
      {
        id: "lab-2",
        title: "Experiment 2: Joins & Subqueries",
        concepts: [
          "Writing multi-table join queries",
          "Nested subqueries and correlated subqueries",
          "Aggregate functions with GROUP BY and HAVING",
          "Sample lab task: generate a department-wise salary report"
        ],
        notesUrl: "#"
      },
      {
        id: "lab-3",
        title: "Experiment 3: PL/SQL Procedures & Triggers",
        concepts: [
          "Writing stored procedures and functions",
          "Cursors for row-by-row processing",
          "Creating triggers for audit logging",
          "Sample lab task: trigger to log salary updates"
        ],
        notesUrl: "#"
      },
      {
        id: "lab-4",
        title: "Experiment 4: Views & Cursors",
        concepts: [
          "Creating simple and complex views",
          "Updating data through views",
          "Implicit and explicit cursors",
          "Sample lab task: process department records with a cursor"
        ],
        notesUrl: "#"
      },
      {
        id: "lab-5",
        title: "Experiment 5: Transactions & Connectivity",
        concepts: [
          "Using COMMIT, ROLLBACK, and SAVEPOINT",
          "Testing transaction isolation behavior",
          "Connecting an application to a database",
          "Sample lab task: build a transactional student registration flow"
        ],
        notesUrl: "#"
      }
    ],
    programs: [
      {
        id: "lab-program-1",
        title: "Create a Student Table",
        description: "Create a table with primary-key, required-field, and score constraints.",
        code: `CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  score DECIMAL(5, 2) CHECK (score BETWEEN 0 AND 100)
);`
      },
      {
        id: "lab-program-2",
        title: "Salary Audit Trigger",
        description: "Record old and new salary values whenever an employee salary changes.",
        code: `CREATE TRIGGER log_salary_update
AFTER UPDATE OF salary ON employees
FOR EACH ROW
INSERT INTO salary_audit(employee_id, old_salary, new_salary)
VALUES (OLD.id, OLD.salary, NEW.salary);`
      }
    ],
    driveFolderId: "REPLACE_WITH_DBMS_LAB_FOLDER_ID",
    categories: [
      {
        id: "lab-cat-1",
        title: "Viva Voce Questions",
        questions: [
          {
            id: "lab-q1",
            question: "What is the difference between a procedure and a function in PL/SQL?",
            answer: "A procedure performs an action and may or may not return a value via OUT parameters, and cannot be used directly in a SQL expression. A function must return exactly one value and can be called within a SQL statement.",
            important: true
          },
          {
            id: "lab-q2",
            question: "What is a cursor and when is it needed?",
            answer: "A cursor is a pointer to the result set of a query, allowing row-by-row processing. It is needed when operations cannot be performed using a single set-based SQL statement, such as applying custom logic to each row."
          },
          {
            id: "lab-q3",
            question: "Explain the purpose of a trigger with a practical example.",
            answer: "A trigger automatically executes in response to INSERT, UPDATE, or DELETE events on a table. Example: an AFTER UPDATE trigger on an Employees table that logs old and new salary values into an Audit table.",
            important: true
          },
          {
            id: "lab-q4",
            question: "What is the difference between DELETE, TRUNCATE, and DROP?",
            answer: "DELETE removes rows conditionally and can be rolled back; it fires triggers. TRUNCATE removes all rows quickly and cannot usually be rolled back; it resets identity counters. DROP removes the entire table structure along with its data."
          }
        ]
      }
    ]
  }
];
function getCourseById(id) {
  return courses.find((c) => c.id === id);
}
const $$splitComponentImporter = () => import("./_courseId-0DQrfg-b.js");
const Route$2 = createFileRoute("/courses/$courseId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params
  }) => {
    const course = getCourseById(params.courseId);
    if (!course) throw notFound();
    return course;
  }
});
const DRIVE_ROOT_FOLDER_ID = "1_hEs4quoqdEsoR0cAfdTqf0RRaOz-gpy";
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
const GOOGLE_MIME_PREFIX = "application/vnd.google-apps.";
class DriveConfigurationError extends Error {
}
class DriveAccessError extends Error {
}
function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) {
    throw new DriveConfigurationError("Google Drive is not configured yet.");
  }
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });
  return google.drive({ version: "v3", auth });
}
function getCourseFolderId(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) throw new DriveAccessError("Course not found.");
  if (course.driveFolderId.startsWith("REPLACE_WITH_")) {
    throw new DriveConfigurationError("This course folder has not been connected yet.");
  }
  return course.driveFolderId;
}
async function getFile(drive, fileId) {
  const response = await drive.files.get({
    fileId,
    fields: "id,name,mimeType,parents,size,modifiedTime,webViewLink",
    supportsAllDrives: true
  });
  return response.data;
}
async function assertDescendant(drive, itemId, allowedFolderId) {
  if (itemId === allowedFolderId) return;
  const visited = /* @__PURE__ */ new Set();
  let frontier = [itemId];
  while (frontier.length) {
    const currentId = frontier.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    const item = await getFile(drive, currentId);
    const parents = item.parents ?? [];
    if (parents.includes(allowedFolderId)) return;
    frontier.push(...parents.filter((parent) => parent !== DRIVE_ROOT_FOLDER_ID));
  }
  throw new DriveAccessError("The requested item is outside this course folder.");
}
async function listDriveFolder(courseId, requestedFolderId) {
  const drive = getDriveClient();
  const courseFolderId = getCourseFolderId(courseId);
  const folderId = requestedFolderId || courseFolderId;
  await assertDescendant(drive, folderId, courseFolderId);
  const items = [];
  let pageToken;
  do {
    const response = await drive.files.list({
      q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed = false`,
      fields: "nextPageToken,files(id,name,mimeType,size,modifiedTime,webViewLink)",
      orderBy: "folder,name_natural",
      pageSize: 100,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });
    for (const file of response.data.files ?? []) {
      if (!file.id || !file.name || !file.mimeType) continue;
      items.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        isFolder: file.mimeType === FOLDER_MIME_TYPE,
        isGoogleFile: file.mimeType.startsWith(GOOGLE_MIME_PREFIX) && file.mimeType !== FOLDER_MIME_TYPE,
        size: file.size ? Number(file.size) : null,
        modifiedTime: file.modifiedTime ?? null,
        webViewLink: file.webViewLink ?? null
      });
    }
    pageToken = response.data.nextPageToken ?? void 0;
  } while (pageToken);
  items.sort((a, b) => Number(b.isFolder) - Number(a.isFolder) || a.name.localeCompare(b.name));
  return { folderId, courseFolderId, items };
}
async function downloadDriveFile(courseId, fileId) {
  const drive = getDriveClient();
  const courseFolderId = getCourseFolderId(courseId);
  await assertDescendant(drive, fileId, courseFolderId);
  const metadata = await getFile(drive, fileId);
  if (metadata.mimeType?.startsWith(GOOGLE_MIME_PREFIX)) {
    throw new DriveAccessError("Google files must be opened in Drive preview.");
  }
  const response = await drive.files.get(
    { fileId, alt: "media", supportsAllDrives: true },
    { responseType: "stream" }
  );
  return {
    body: Readable.toWeb(response.data),
    name: metadata.name ?? "download",
    mimeType: metadata.mimeType ?? "application/octet-stream",
    size: metadata.size ?? null
  };
}
const Route$1 = createFileRoute("/api/drive/files")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const courseId = url.searchParams.get("courseId")?.trim();
        const folderId = url.searchParams.get("folderId")?.trim() || void 0;
        if (!courseId) {
          return Response.json({ error: "A course is required." }, { status: 400 });
        }
        try {
          return Response.json(await listDriveFolder(courseId, folderId), {
            headers: { "Cache-Control": "private, max-age=60" }
          });
        } catch (error) {
          if (error instanceof DriveConfigurationError) {
            return Response.json({ error: error.message, unconfigured: true }, { status: 503 });
          }
          if (error instanceof DriveAccessError) {
            return Response.json({ error: error.message }, { status: 403 });
          }
          return Response.json(
            { error: "Drive files could not be loaded. Check folder sharing and try again." },
            { status: 502 }
          );
        }
      }
    }
  }
});
function safeFilename(name) {
  return name.replace(/[\r\n"\\/]/g, "_");
}
const Route = createFileRoute("/api/drive/download/$fileId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const courseId = new URL(request.url).searchParams.get("courseId")?.trim();
        if (!courseId) return new Response("A course is required.", { status: 400 });
        try {
          const file = await downloadDriveFile(courseId, params.fileId);
          const headers = new Headers({
            "Content-Type": file.mimeType,
            "Content-Disposition": `attachment; filename="${safeFilename(file.name)}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
            "Cache-Control": "private, no-store",
            "X-Content-Type-Options": "nosniff"
          });
          if (file.size) headers.set("Content-Length", file.size);
          return new Response(file.body, { headers });
        } catch (error) {
          if (error instanceof DriveConfigurationError) {
            return new Response(error.message, { status: 503 });
          }
          if (error instanceof DriveAccessError) {
            return new Response(error.message, { status: 403 });
          }
          return new Response("The file could not be downloaded.", { status: 502 });
        }
      }
    }
  }
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const CoursesCourseIdRoute = Route$2.update({
  id: "/courses/$courseId",
  path: "/courses/$courseId",
  getParentRoute: () => Route$4
});
const ApiDriveFilesRoute = Route$1.update({
  id: "/api/drive/files",
  path: "/api/drive/files",
  getParentRoute: () => Route$4
});
const ApiDriveDownloadFileIdRoute = Route.update({
  id: "/api/drive/download/$fileId",
  path: "/api/drive/download/$fileId",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  CoursesCourseIdRoute,
  ApiDriveFilesRoute,
  ApiDriveDownloadFileIdRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  academicYear as a,
  courses as b,
  collegeName as c,
  router as r
};
