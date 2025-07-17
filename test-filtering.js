// Test script to debug the student filtering issue
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

function testFiltering() {
  const schoolId = "1";
  console.log("Testing schoolId:", schoolId, "Type:", typeof schoolId);
  
  const filtered = fallbackStudents.filter(student => {
    console.log(`Comparing: student.SchoolId="${student.SchoolId}" (${typeof student.SchoolId}) === schoolId="${schoolId}" (${typeof schoolId})`);
    return student.SchoolId === schoolId;
  });
  
  console.log("Filtered results:", filtered);
  return filtered;
}

testFiltering();
