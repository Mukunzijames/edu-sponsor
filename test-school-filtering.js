// Quick test to verify school student filtering works
const fallbackStudents = [
  { Id: "1", Name: "Maria", SchoolId: "1" },
  { Id: "2", Name: "Jean", SchoolId: "1" },
  { Id: "5", Name: "Alice", SchoolId: "2" },
  { Id: "8", Name: "Peter", SchoolId: "3" }
];

function testSchoolFiltering() {
  console.log("Testing school filtering:");
  
  // Test School ID 1
  const school1Students = fallbackStudents.filter(s => s.SchoolId === "1");
  console.log("School 1 students:", school1Students.length, school1Students.map(s => s.Name));
  
  // Test School ID 2  
  const school2Students = fallbackStudents.filter(s => s.SchoolId === "2");
  console.log("School 2 students:", school2Students.length, school2Students.map(s => s.Name));
  
  // Test School ID 3
  const school3Students = fallbackStudents.filter(s => s.SchoolId === "3");
  console.log("School 3 students:", school3Students.length, school3Students.map(s => s.Name));
}

testSchoolFiltering();
