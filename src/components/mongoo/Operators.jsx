"use client";

import { useState } from "react";

const Operators = () => {
  const [activeTab, setActiveTab] = useState("comparison");

  const tabs = [
    { id: "comparison", label: "Comparison" },
    { id: "logical", label: "Logical" },
    { id: "element", label: "Element" },
    { id: "evaluation", label: "Evaluation" },
    { id: "array", label: "Array" },
    { id: "bitwise", label: "Bitwise" },
    { id: "update", label: "Update" },
  ];

  const operators = {
    comparison: [
      {
        name: "$eq",
        desc: "Matches values equal to specified value",
        doc: `{ _id: 1, name: "John", age: 25 }`,
        query: `db.users.find({ age: { $eq: 25 } })`,
        output: `{ _id: 1, name: "John", age: 25 }`,
        category: "Query",
      },
      {
        name: "$ne",
        desc: "Matches values not equal to specified value",
        doc: `{ _id: 1, name: "John", age: 25 },\n{ _id: 2, name: "Jane", age: 30 }`,
        query: `db.users.find({ age: { $ne: 25 } })`,
        output: `{ _id: 2, name: "Jane", age: 30 }`,
        category: "Query",
      },
      {
        name: "$gt",
        desc: "Matches values greater than specified value",
        doc: `{ _id: 1, age: 20 },\n{ _id: 2, age: 30 }`,
        query: `db.users.find({ age: { $gt: 25 } })`,
        output: `{ _id: 2, age: 30 }`,
        category: "Query",
      },
      {
        name: "$gte",
        desc: "Matches values greater than or equal",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 }`,
        query: `db.users.find({ age: { $gte: 25 } })`,
        output: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 }`,
        category: "Query",
      },
      {
        name: "$lt",
        desc: "Matches values less than specified value",
        doc: `{ _id: 1, age: 20 },\n{ _id: 2, age: 30 }`,
        query: `db.users.find({ age: { $lt: 25 } })`,
        output: `{ _id: 1, age: 20 }`,
        category: "Query",
      },
      {
        name: "$lte",
        desc: "Matches values less than or equal",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 }`,
        query: `db.users.find({ age: { $lte: 25 } })`,
        output: `{ _id: 1, age: 25 }`,
        category: "Query",
      },
      {
        name: "$in",
        desc: "Matches any value in array",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 },\n{ _id: 3, age: 35 }`,
        query: `db.users.find({ age: { $in: [25, 35] } })`,
        output: `{ _id: 1, age: 25 },\n{ _id: 3, age: 35 }`,
        category: "Query",
      },
      {
        name: "$nin",
        desc: "Matches none of values in array",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 },\n{ _id: 3, age: 35 }`,
        query: `db.users.find({ age: { $nin: [25, 30] } })`,
        output: `{ _id: 3, age: 35 }`,
        category: "Query",
      },
    ],
    logical: [
      {
        name: "$and",
        desc: "Joins query clauses with logical AND",
        doc: `{ _id: 1, age: 20, status: "active" },\n{ _id: 2, age: 30, status: "active" }`,
        query: `db.users.find({ $and: [ { age: { $gt: 18 } }, { status: "active" } ] })`,
        output: `{ _id: 1, age: 20, status: "active" },\n{ _id: 2, age: 30, status: "active" }`,
        category: "Query",
      },
      {
        name: "$or",
        desc: "Joins query clauses with logical OR",
        doc: `{ _id: 1, age: 16, status: "active" },\n{ _id: 2, age: 20, status: "inactive" }`,
        query: `db.users.find({ $or: [ { age: { $lt: 18 } }, { status: "inactive" } ] })`,
        output: `{ _id: 1, age: 16, status: "active" },\n{ _id: 2, age: 20, status: "inactive" }`,
        category: "Query",
      },
      {
        name: "$nor",
        desc: "Joins query clauses with logical NOR",
        doc: `{ _id: 1, age: 16, status: "active" },\n{ _id: 2, age: 25, status: "inactive" },\n{ _id: 3, age: 25, status: "active" }`,
        query: `db.users.find({ $nor: [ { age: { $lt: 18 } }, { status: "inactive" } ] })`,
        output: `{ _id: 3, age: 25, status: "active" }`,
        category: "Query",
      },
      {
        name: "$not",
        desc: "Inverts the effect of expression",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: 30 }`,
        query: `db.users.find({ age: { $not: { $eq: 25 } } })`,
        output: `{ _id: 2, age: 30 }`,
        category: "Query",
      },
    ],
    element: [
      {
        name: "$exists",
        desc: "Matches documents with specified field",
        doc: `{ _id: 1, name: "John", email: "john@example.com" },\n{ _id: 2, name: "Jane" }`,
        query: `db.users.find({ email: { $exists: true } })`,
        output: `{ _id: 1, name: "John", email: "john@example.com" }`,
        category: "Query",
      },
      {
        name: "$type",
        desc: "Matches documents by BSON type",
        doc: `{ _id: 1, age: 25 },\n{ _id: 2, age: "25" }`,
        query: `db.users.find({ age: { $type: "number" } })`,
        output: `{ _id: 1, age: 25 }`,
        category: "Query",
      },
    ],
    evaluation: [
      {
        name: "$regex",
        desc: "Matches by pattern",
        doc: `{ _id: 1, name: "John" },\n{ _id: 2, name: "Alice" }`,
        query: `db.users.find({ name: { $regex: "^J", $options: "i" } })`,
        output: `{ _id: 1, name: "John" }`,
        category: "Query",
      },
      {
        name: "$mod",
        desc: "Performs modulo operation",
        doc: `{ _id: 1, age: 20 },\n{ _id: 2, age: 21 }`,
        query: `db.users.find({ age: { $mod: [2, 0] } })`,
        output: `{ _id: 1, age: 20 }`,
        category: "Query",
      },
      {
        name: "$text",
        desc: "Performs text search",
        doc: `{ _id: 1, bio: "John loves MongoDB" },\n{ _id: 2, bio: "Alice loves SQL" }`,
        query: `db.users.find({ $text: { $search: "MongoDB" } })`,
        output: `{ _id: 1, bio: "John loves MongoDB" }`,
        category: "Query",
      },
      {
        name: "$expr",
        desc: "Uses aggregation expressions in queries",
        doc: `{ _id: 1, price: 100, discount: 20 },\n{ _id: 2, price: 50, discount: 60 }`,
        query: `db.products.find({ $expr: { $gt: ["$price", "$discount"] } })`,
        output: `{ _id: 1, price: 100, discount: 20 }`,
        category: "Query",
      },
      {
        name: "$jsonSchema",
        desc: "Matches documents against a JSON Schema",
        doc: `{ _id: 1, name: "John", age: 25 },\n{ _id: 2, name: "Alice", age: "25" }`,
        query: `db.users.find({
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "age"],
    properties: { age: { bsonType: "int" } }
  }
})`,
        output: `{ _id: 1, name: "John", age: 25 }`,
        category: "Query",
      },
      {
        name: "$where",
        desc: "Matches documents that satisfy a JavaScript expression",
        doc: `{ _id: 1, visits: 5 },\n{ _id: 2, visits: 1 }`,
        query: `db.users.find({ $where: "this.visits > 3" })`,
        output: `{ _id: 1, visits: 5 }`,
        category: "Query",
      },
    ],

    array: [
      {
        name: "$all",
        desc: "Matches arrays containing all specified elements",
        doc: `{ _id: 1, tags: ["admin", "user"] },\n{ _id: 2, tags: ["user"] }`,
        query: `db.users.find({ tags: { $all: ["admin", "user"] } })`,
        output: `{ _id: 1, tags: ["admin", "user"] }`,
        category: "Query",
      },
      {
        name: "$size",
        desc: "Matches arrays with specified number of elements",
        doc: `{ _id: 1, tags: ["a", "b"] },\n{ _id: 2, tags: ["a"] }`,
        query: `db.users.find({ tags: { $size: 2 } })`,
        output: `{ _id: 1, tags: ["a", "b"] }`,
        category: "Query",
      },
      {
        name: "$elemMatch",
        desc: "Matches more than one component within single array element",
        doc: `{ _id: 1, grades: [ { grade: 80, mean: 75 }, { grade: 60, mean: 65 } ] }`,
        query: `db.users.find({ grades: { $elemMatch: { grade: 80, mean: 75 } } })`,
        output: `{ _id: 1, grades: [ { grade: 80, mean: 75 }, { grade: 60, mean: 65 } ] }`,
        category: "Query",
      },
      {
        name: "$in",
        desc: "Matches value in array field",
        doc: `{ _id: 1, tags: ["admin", "user"] },\n{ _id: 2, tags: ["guest"] }`,
        query: `db.users.find({ tags: { $in: ["admin"] } })`,
        output: `{ _id: 1, tags: ["admin", "user"] }`,
        category: "Query",
      },
    ],
    bitwise: [
      {
        name: "$bitsAllSet",
        desc: "Matches if all specified bits are set",
        doc: `{ _id: 1, flags: 6 } // 110 in binary`,
        query: `db.users.find({ flags: { $bitsAllSet: [1, 2] } })`,
        output: `{ _id: 1, flags: 6 }`,
        category: "Query",
      },
      {
        name: "$bitsAllClear",
        desc: "Matches if all specified bits are clear",
        doc: `{ _id: 1, flags: 1 } // 001 in binary`,
        query: `db.users.find({ flags: { $bitsAllClear: [1, 2] } })`,
        output: `{ _id: 1, flags: 1 }`,
        category: "Query",
      },
      {
        name: "$bitsAnySet",
        desc: "Matches if any specified bits are set",
        doc: `{ _id: 1, flags: 2 } // 010 in binary`,
        query: `db.users.find({ flags: { $bitsAnySet: [1, 2] } })`,
        output: `{ _id: 1, flags: 2 }`,
        category: "Query",
      },
    ],
    update: [
      {
        name: "$currentDate",
        desc: "Sets the field value to the current date",
        doc: `{ _id: 1, name: "John" }`,
        query: `db.users.updateOne({ _id: 1 }, { $currentDate: { lastLogin: true } })`,
        output: `{ _id: 1, name: "John", lastLogin: ISODate("2025-01-01T00:00:00Z") }`,
        category: "Update",
      },
      {
        name: "$inc",
        desc: "Increments the field value",
        doc: `{ _id: 1, name: "John", age: 25 }`,
        query: `db.users.updateOne({ _id: 1 }, { $inc: { age: 1 } })`,
        output: `{ _id: 1, name: "John", age: 26 }`,
        category: "Update",
      },
      {
        name: "$rename",
        desc: "Renames the field",
        doc: `{ _id: 1, name: "John" }`,
        query: `db.users.updateOne({ _id: 1 }, { $rename: { "name": "fullName" } })`,
        output: `{ _id: 1, fullName: "John" }`,
        category: "Update",
      },
      {
        name: "$set",
        desc: "Sets the value of a field",
        doc: `{ _id: 1, name: "John" }`,
        query: `db.users.updateOne({ _id: 1 }, { $set: { age: 25 } })`,
        output: `{ _id: 1, name: "John", age: 25 }`,
        category: "Update",
      },
      {
        name: "$unset",
        desc: "Removes the field from the document",
        doc: `{ _id: 1, name: "John", age: 25 }`,
        query: `db.users.updateOne({ _id: 1 }, { $unset: { age: "" } })`,
        output: `{ _id: 1, name: "John" }`,
        category: "Update",
      },
      {
        name: "$addToSet",
        desc: "Adds distinct elements to an array",
        doc: `{ _id: 1, name: "John", roles: ["user"] }`,
        query: `db.users.updateOne({ _id: 1 }, { $addToSet: { roles: "admin" } })`,
        output: `{ _id: 1, name: "John", roles: ["user", "admin"] }`,
        category: "Update",
      },
      {
        name: "$pop",
        desc: "Removes the first or last element of an array",
        doc: `{ _id: 1, scores: [10, 20, 30] }`,
        query: `db.users.updateOne({ _id: 1 }, { $pop: { scores: 1 } }) // remove last`,
        output: `{ _id: 1, scores: [10, 20] }`,
        category: "Update",
      },
      {
        name: "$pull",
        desc: "Removes all elements from an array that match the query",
        doc: `{ _id: 1, tags: ["mongodb", "database", "nosql"] }`,
        query: `db.users.updateOne({ _id: 1 }, { $pull: { tags: "database" } })`,
        output: `{ _id: 1, tags: ["mongodb", "nosql"] }`,
        category: "Update",
      },
      {
        name: "$push",
        desc: "Adds an element to an array",
        doc: `{ _id: 1, tags: ["mongodb"] }`,
        query: `db.users.updateOne({ _id: 1 }, { $push: { tags: "database" } })`,
        output: `{ _id: 1, tags: ["mongodb", "database"] }`,
        category: "Update",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen scrollbar_hidden">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        MongoDB Operators Complete Reference
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-1 rounded-xl shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Operators Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operators[activeTab].map((op, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{op.name}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {op.category ?? "Query"}
              </span>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">{op.desc}</p>

            <div className="space-y-4">
              {/* Sample Document */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Sample Document
                </p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-gray-800 whitespace-pre-wrap break-words">
                  {op.doc}
                </pre>
              </div>

              {/* Query with copy */}
              <div className="relative">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  {op.category === "Update" ? "Update Command" : "Query"}
                </p>
                <pre className="bg-gray-900 text-green-400 p-3 pt-9 rounded-lg text-sm font-mono overflow-x-auto border border-gray-800 whitespace-pre-wrap break-words">
                  {op.query}
                </pre>
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(op.query);
                    const btn = e.currentTarget;
                    const originalText = btn.textContent;
                    btn.textContent = "Copied!";
                    btn.className += " bg-green-500";
                    setTimeout(() => {
                      btn.textContent = originalText;
                      btn.classList.remove("bg-green-500");
                    }, 1500);
                  }}
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white absolute top-5 right-2 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Copy
                </button>
              </div>

              {/* Result */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Result
                </p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-gray-800 whitespace-pre-wrap break-words">
                  {op.output}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-lg">
          Total Operators: {operators[activeTab].length} shown
        </p>
      </div>
    </div>
  );
};

export default Operators;
