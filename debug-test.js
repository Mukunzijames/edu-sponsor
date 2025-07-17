// Test to verify student data filtering
const fallbackStudents = [
  {
    Id: "1",
    Name: "Maria Uwimana",
    SchoolId: "1"
  },
  {
    Id: "2",
    Name: "Jean Baptiste Nkurunziza", 
    SchoolId: "1"
  },
  {
    Id: "5",
    Name: "Alice Mukashema",
    SchoolId: "2"
  }
];

console.log("Testing school filtering with debug:");

// Test different school IDs
["1", "2", "3"].forEach(schoolId => {
  console.log(`\n=== Testing School ID: "${schoolId}" ===`);
  console.log('schoolId type:', typeof schoolId);
  
  const filtered = fallbackStudents.filter(student => {
    const match = student.SchoolId === schoolId;
    console.log(`Student ${student.Name} (SchoolId: "${student.SchoolId}") === "${schoolId}": ${match}`);
    return match;
  });
  
  console.log(`Result: ${filtered.length} students found`);
  console.log('Students:', filtered.map(s => s.Name));
});

// Test to check if data exists
console.log('\n=== All Student Data ===');
console.log('Total students:', fallbackStudents.length);
console.log('School IDs present:', [...new Set(fallbackStudents.map(s => s.SchoolId))]);
