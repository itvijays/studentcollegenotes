export interface Lesson {
  id: string
  title: string
  concepts: string[]
  notesUrl: string
}

export interface Question {
  id: string
  question: string
  answer: string
  important?: boolean
}

export interface QuestionCategory {
  id: string
  title: string
  questions: Question[]
}

export interface Course {
  id: string
  name: string
  type: 'theory' | 'practical'
  yearSemester: string
  description: string
  color: 'blue' | 'indigo' | 'teal'
  lessons: Lesson[]
  categories: QuestionCategory[]
}

export const academicYear = '2026 - 2027'
export const collegeName = "Priya's Study Hub"

const courses: Course[] = [
  {
    id: 'data-structures',
    name: 'Data Structures',
    type: 'theory',
    yearSemester: '2nd Year · Semester 3',
    description:
      'Core concepts of arrays, linked lists, trees, and graphs with algorithmic problem solving.',
    color: 'blue',
    lessons: [
      {
        id: 'ds-1',
        title: 'Lesson 1: Arrays & Linked Lists',
        concepts: [
          'Static vs dynamic arrays and memory layout',
          'Singly, doubly, and circular linked lists',
          'Insertion, deletion, and traversal operations',
          'Time complexity comparison: array vs linked list',
        ],
        notesUrl: '#',
      },
      {
        id: 'ds-2',
        title: 'Lesson 2: Stacks & Queues',
        concepts: [
          'LIFO and FIFO principles',
          'Array-based and linked-list-based implementations',
          'Applications: expression evaluation, recursion, scheduling',
          'Circular queues and deques',
        ],
        notesUrl: '#',
      },
      {
        id: 'ds-3',
        title: 'Lesson 3: Trees & Binary Search Trees',
        concepts: [
          'Tree terminology: root, leaf, height, depth',
          'Binary tree traversals: inorder, preorder, postorder',
          'BST insertion, deletion, and search',
          'Balanced trees: AVL rotation basics',
        ],
        notesUrl: '#',
      },
    ],
    categories: [
      {
        id: 'ds-cat-1',
        title: 'Arrays & Linked Lists',
        questions: [
          {
            id: 'ds-q1',
            question: 'Explain the difference between an array and a linked list with their time complexities.',
            answer:
              'Arrays offer O(1) random access but O(n) insertion/deletion (due to shifting). Linked lists offer O(1) insertion/deletion at a known node but O(n) access since traversal is required. Arrays use contiguous memory; linked lists use scattered memory with pointers.',
            important: true,
          },
          {
            id: 'ds-q2',
            question: 'Write an algorithm to reverse a singly linked list.',
            answer:
              'Maintain three pointers: prev = null, curr = head, next = null. Traverse the list, at each node set next = curr.next, curr.next = prev, prev = curr, curr = next. When curr is null, prev is the new head.',
            important: true,
          },
          {
            id: 'ds-q3',
            question: 'What is a circular linked list and where is it used?',
            answer:
              'A circular linked list has its last node pointing back to the first node instead of null. Used in round-robin scheduling, buffering, and multiplayer games where the turn cycles continuously.',
          },
        ],
      },
      {
        id: 'ds-cat-2',
        title: 'Stacks, Queues & Trees',
        questions: [
          {
            id: 'ds-q4',
            question: 'How is a stack used to check balanced parentheses in an expression?',
            answer:
              'Push opening brackets onto the stack. On encountering a closing bracket, pop and check if it matches the corresponding opening bracket. If the stack is empty at the end and all matches succeeded, the expression is balanced.',
            important: true,
          },
          {
            id: 'ds-q5',
            question: 'Differentiate between inorder, preorder, and postorder tree traversal.',
            answer:
              'Inorder (left, root, right) gives sorted order for a BST. Preorder (root, left, right) is used to copy a tree. Postorder (left, right, root) is used to delete a tree or evaluate postfix expressions.',
          },
        ],
      },
    ],
  },
  {
    id: 'database-systems',
    name: 'Database Management Systems',
    type: 'theory',
    yearSemester: '3rd Year · Semester 5',
    description:
      'Relational models, SQL, normalization, transactions, and indexing for real-world database design.',
    color: 'indigo',
    lessons: [
      {
        id: 'dbms-1',
        title: 'Lesson 1: Relational Model & ER Diagrams',
        concepts: [
          'Entities, attributes, and relationships',
          'Mapping ER diagrams to relational schemas',
          'Keys: primary, candidate, foreign, composite',
          'Cardinality and participation constraints',
        ],
        notesUrl: '#',
      },
      {
        id: 'dbms-2',
        title: 'Lesson 2: SQL & Normalization',
        concepts: [
          'DDL, DML, and DQL commands',
          'Joins: inner, outer, left, right',
          '1NF, 2NF, 3NF, and BCNF explained with examples',
          'Functional dependencies and anomalies',
        ],
        notesUrl: '#',
      },
      {
        id: 'dbms-3',
        title: 'Lesson 3: Transactions & Concurrency',
        concepts: [
          'ACID properties',
          'Schedules: serial, serializable, conflict-serializable',
          'Locking protocols and deadlock handling',
          'Indexing basics: B+ trees and hashing',
        ],
        notesUrl: '#',
      },
    ],
    categories: [
      {
        id: 'dbms-cat-1',
        title: 'Relational Model & SQL',
        questions: [
          {
            id: 'dbms-q1',
            question: 'What is normalization? Explain 1NF, 2NF, and 3NF with an example.',
            answer:
              '1NF requires atomic values with no repeating groups. 2NF requires 1NF plus no partial dependency on a composite key. 3NF requires 2NF plus no transitive dependency on non-key attributes. Example: splitting a student-course table so course details depend only on course_id, not student_id.',
            important: true,
          },
          {
            id: 'dbms-q2',
            question: 'Differentiate between INNER JOIN and LEFT JOIN with an example query.',
            answer:
              'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table and matched rows from the right, filling NULL where there is no match. Example: SELECT * FROM Students LEFT JOIN Enrollments ON Students.id = Enrollments.student_id.',
            important: true,
          },
        ],
      },
      {
        id: 'dbms-cat-2',
        title: 'Transactions & Indexing',
        questions: [
          {
            id: 'dbms-q3',
            question: 'Explain the ACID properties of a transaction.',
            answer:
              'Atomicity ensures all-or-nothing execution. Consistency ensures the database moves between valid states. Isolation ensures concurrent transactions do not interfere. Durability ensures committed changes survive system failure.',
            important: true,
          },
          {
            id: 'dbms-q4',
            question: 'What is a deadlock and how can it be prevented?',
            answer:
              'A deadlock occurs when two or more transactions wait indefinitely for locks held by each other. It can be prevented using timeout mechanisms, wait-die/wound-wait schemes, or by acquiring locks in a fixed global order.',
          },
          {
            id: 'dbms-q5',
            question: 'Why are B+ trees preferred over binary search trees for database indexing?',
            answer:
              'B+ trees have a high branching factor, keeping the tree shallow and reducing disk I/O. All data resides in leaf nodes linked sequentially, which makes range queries very efficient compared to a binary search tree.',
          },
        ],
      },
    ],
  },
  {
    id: 'dbms-lab',
    name: 'DBMS Lab',
    type: 'practical',
    yearSemester: '3rd Year · Semester 5',
    description:
      'Hands-on SQL programming, PL/SQL procedures, and database design exercises in the lab.',
    color: 'teal',
    lessons: [
      {
        id: 'lab-1',
        title: 'Experiment 1: DDL & DML Basics',
        concepts: [
          'Creating tables with constraints (PK, FK, CHECK, UNIQUE)',
          'Inserting, updating, and deleting records',
          'ALTER TABLE operations',
          'Sample lab task: design a Library Management schema',
        ],
        notesUrl: '#',
      },
      {
        id: 'lab-2',
        title: 'Experiment 2: Joins & Subqueries',
        concepts: [
          'Writing multi-table join queries',
          'Nested subqueries and correlated subqueries',
          'Aggregate functions with GROUP BY and HAVING',
          'Sample lab task: generate a department-wise salary report',
        ],
        notesUrl: '#',
      },
      {
        id: 'lab-3',
        title: 'Experiment 3: PL/SQL Procedures & Triggers',
        concepts: [
          'Writing stored procedures and functions',
          'Cursors for row-by-row processing',
          'Creating triggers for audit logging',
          'Sample lab task: trigger to log salary updates',
        ],
        notesUrl: '#',
      },
    ],
    categories: [
      {
        id: 'lab-cat-1',
        title: 'Viva Voce Questions',
        questions: [
          {
            id: 'lab-q1',
            question: 'What is the difference between a procedure and a function in PL/SQL?',
            answer:
              'A procedure performs an action and may or may not return a value via OUT parameters, and cannot be used directly in a SQL expression. A function must return exactly one value and can be called within a SQL statement.',
            important: true,
          },
          {
            id: 'lab-q2',
            question: 'What is a cursor and when is it needed?',
            answer:
              'A cursor is a pointer to the result set of a query, allowing row-by-row processing. It is needed when operations cannot be performed using a single set-based SQL statement, such as applying custom logic to each row.',
          },
          {
            id: 'lab-q3',
            question: 'Explain the purpose of a trigger with a practical example.',
            answer:
              'A trigger automatically executes in response to INSERT, UPDATE, or DELETE events on a table. Example: an AFTER UPDATE trigger on an Employees table that logs old and new salary values into an Audit table.',
            important: true,
          },
          {
            id: 'lab-q4',
            question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
            answer:
              'DELETE removes rows conditionally and can be rolled back; it fires triggers. TRUNCATE removes all rows quickly and cannot usually be rolled back; it resets identity counters. DROP removes the entire table structure along with its data.',
          },
        ],
      },
    ],
  },
]

export default courses

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id)
}
