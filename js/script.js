document.addEventListener('DOMContentLoaded', function () {
  const streamSelect = document.getElementById('stream');
  const scienceSubjects = document.getElementById('science-subjects');
  const socialSubjects = document.getElementById('social-subjects');
  const calculateBtn = document.getElementById('calculate-btn');

  // Toggle subjects based on stream selection
  streamSelect.addEventListener('change', function () {
    if (streamSelect.value === 'science') {
      scienceSubjects.classList.add('active');
      socialSubjects.classList.remove('active');
    } else {
      socialSubjects.classList.add('active');
      scienceSubjects.classList.remove('active');
    }
  });

  // Calculate total score and grade
  calculateBtn.addEventListener('click', function () {
    let totalScore = 0;
    const subjectGrades = [];

    if (streamSelect.value === 'science') {
      totalScore += calculateSubject('math-science', 125, 'Math', subjectGrades);
      totalScore += calculateSubject('bio', 75, 'Biology', subjectGrades);
      totalScore += calculateSubject('his-science', 50, 'Option Subject', subjectGrades);
      totalScore += calculateSubject('chem', 75, 'Chemistry', subjectGrades);
      totalScore += calculateSubject('khmer-science', 75, 'Khmer literature', subjectGrades);
      totalScore += calculateSubject('physic', 75, 'Physics', subjectGrades);
      totalScore += calculateEnglishSubject('english-science', 50, 'Foreign Languages', subjectGrades);
    } else {
      totalScore += calculateSubject('math-social', 75, 'Math', subjectGrades);
      totalScore += calculateSubject('khmer-social', 125, 'Khmer literature', subjectGrades);
      totalScore += calculateSubject('his-social', 75, 'History', subjectGrades);
      totalScore += calculateSubject('geology', 75, 'Option Subject', subjectGrades);
      totalScore += calculateSubject('geography', 75, 'Geography', subjectGrades);
      totalScore += calculateSubject('civic', 75, 'Civic Ethics', subjectGrades);
      totalScore += calculateEnglishSubject('english-social', 50, 'Foreign Languages', subjectGrades);
    }

    const grade = calculateGrade(totalScore);
    const isPass = totalScore >= 200; // Passing condition: total score >= 200

    // Save data to local storage
    localStorage.setItem('totalScore', totalScore.toFixed(2));
    localStorage.setItem('grade', grade);
    localStorage.setItem('isPass', isPass);
    localStorage.setItem('subjectGrades', JSON.stringify(subjectGrades));

    // Redirect to result page
    window.location.href = 'page/result.html';
  });

  // Calculate score and grade for a subject
  function calculateSubject(subjectId, maxScore, subjectName, subjectGrades) {
    const input = document.getElementById(subjectId);
    const score = parseFloat(input.value) || 0;

    const percentage = (score / maxScore) * 100;
    const grade = calculateSubjectGrade(percentage);

    // Save subject grade
    subjectGrades.push({ name: subjectName, grade: grade });

    return score;
  }

  // Calculate score and grade for English subject
  function calculateEnglishSubject(subjectId, maxScore, subjectName, subjectGrades) {
    const input = document.getElementById(subjectId);
    const score = parseFloat(input.value) || 0;

    // Calculate grade based on real score (not divided by 2)
    const percentage = (score / maxScore) * 100;
    const grade = calculateSubjectGrade(percentage);

    // Save subject grade
    subjectGrades.push({ name: subjectName, grade: grade });

    // Add half of the score to the total score
    return score / 2;
  }

  // Calculate grade for a subject based on percentage
  function calculateSubjectGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    if (percentage >= 50) return 'E';
    return 'F';
  }

  // Calculate overall grade based on total score
  function calculateGrade(totalScore) {
    if (totalScore >= 427) return 'A';
    if (totalScore >= 380) return 'B';
    if (totalScore >= 332) return 'C';
    if (totalScore >= 286) return 'D';
    if (totalScore >= 237) return 'E';
    return 'F';
  }
});