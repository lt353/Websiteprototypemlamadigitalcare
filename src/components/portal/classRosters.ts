import { Student } from './TeacherRouter';

// Class-specific rosters mapped by class ID
const CLASS_ROSTERS: { [classId: string]: Student[] } = {
  // Monday, Dec 2 - 10:00 AM - iPhone Basics for Beginners (Group)
  '1': [
    { id: '1-1', name: 'Helen Rodriguez', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'helen.rodriguez@email.com', phone: '(808) 555-0201' },
    { id: '1-2', name: 'George Fernandes', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'george.fernandes@email.com', phone: '(808) 555-0202' },
    { id: '1-3', name: 'Linda Chen', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'linda.chen@email.com', phone: '(808) 555-0203' },
    { id: '1-4', name: 'Charles Wong', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'charles.wong@email.com', phone: '(808) 555-0204' },
    { id: '1-5', name: 'Susan Yamamoto', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'susan.yamamoto@email.com', phone: '(808) 555-0205' },
    { id: '1-6', name: 'Paul Martinez', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'paul.martinez@email.com', phone: '(808) 555-0206' },
    { id: '1-7', name: 'Nancy Silva', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'nancy.silva@email.com', phone: '(808) 555-0207' },
    { id: '1-8', name: 'Frank Tanaka', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'frank.tanaka@email.com', phone: '(808) 555-0208' },
    { id: '1-9', name: 'Betty Nakamura', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'betty.nakamura@email.com', phone: '(808) 555-0209' },
    { id: '1-10', name: 'Daniel Kim', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'daniel.kim@email.com', phone: '(808) 555-0210' }
  ],

  // Monday, Dec 2 - 12:30 PM - FaceTime Help with Grandkids (1:1 Virtual)
  '2': [
    { id: '2-1', name: 'Margaret Santos', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'margaret.santos@email.com', phone: '(808) 555-0123' }
  ],

  // Monday, Dec 2 - 2:00 PM - Health Apps & Patient Portals (Group)
  '3': [
    { id: '3-1', name: 'Robert Tanaka', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'robert.tanaka@email.com', phone: '(808) 555-0124' },
    { id: '3-2', name: 'Dorothy Chang', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'dorothy.chang@email.com', phone: '(808) 555-0125' },
    { id: '3-3', name: 'William Lee', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: true, hearing: true, mobility: false }, email: 'william.lee@email.com', phone: '(808) 555-0126' },
    { id: '3-4', name: 'Patricia Kim', deviceType: 'Android', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'patricia.kim@email.com', phone: '(808) 555-0127' },
    { id: '3-5', name: 'James Wong', deviceType: 'iPad', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'james.wong@email.com', phone: '(808) 555-0128' },
    { id: '3-6', name: 'Mary Nakamura', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'mary.nakamura@email.com', phone: '(808) 555-0129' },
    { id: '3-7', name: 'Thomas Martinez', deviceType: 'iPad', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'thomas.martinez@email.com', phone: '(808) 555-0132' },
    { id: '3-8', name: 'Jennifer Lopez', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'jennifer.lopez@email.com', phone: '(808) 555-0301' },
    { id: '3-9', name: 'Michael Chen', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'michael.chen@email.com', phone: '(808) 555-0302' }
  ],

  // Tuesday, Dec 3 - 10:00 AM - Password Management Made Easy (Group)
  '4': [
    { id: '4-1', name: 'Alice Yamamoto', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'alice.yamamoto@email.com', phone: '(808) 555-0401' },
    { id: '4-2', name: 'Steven Rodriguez', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'steven.rodriguez@email.com', phone: '(808) 555-0402' },
    { id: '4-3', name: 'Karen Silva', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'karen.silva@email.com', phone: '(808) 555-0403' },
    { id: '4-4', name: 'Richard Lee', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'richard.lee@email.com', phone: '(808) 555-0404' },
    { id: '4-5', name: 'Sandra Wong', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'sandra.wong@email.com', phone: '(808) 555-0405' },
    { id: '4-6', name: 'David Kim', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'david.kim@email.com', phone: '(808) 555-0406' },
    { id: '4-7', name: 'Laura Tanaka', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'laura.tanaka@email.com', phone: '(808) 555-0407' },
    { id: '4-8', name: 'Joseph Chen', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'joseph.chen@email.com', phone: '(808) 555-0408' },
    { id: '4-9', name: 'Maria Fernandez', deviceType: 'iPad', status: 'standard', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'maria.fernandez@email.com', phone: '(808) 555-0409' },
    { id: '4-10', name: 'Kenneth Nakamura', deviceType: 'Android', status: 'premium', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'kenneth.nakamura@email.com', phone: '(808) 555-0410' },
    { id: '4-11', name: 'Deborah Martinez', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'deborah.martinez@email.com', phone: '(808) 555-0411' },
    { id: '4-12', name: 'Gary Santos', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'gary.santos@email.com', phone: '(808) 555-0412' }
  ],

  // Tuesday, Dec 3 - 1:00 PM - Setting up MyChart on iPad (1:1 In-Person)
  '5': [
    { id: '5-1', name: 'Dorothy Chang', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'dorothy.chang@email.com', phone: '(808) 555-0125' }
  ],

  // Tuesday, Dec 3 - 3:00 PM - Video Calling with Family (Group)
  '6': [
    { id: '6-1', name: 'Barbara Fernandez', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'barbara.fernandez@email.com', phone: '(808) 555-0131' },
    { id: '6-2', name: 'Richard Silva', deviceType: 'Android', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'richard.silva@email.com', phone: '(808) 555-0130' },
    { id: '6-3', name: 'Susan Yamamoto', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'susan.yamamoto@email.com', phone: '(808) 555-0133' },
    { id: '6-4', name: 'George Fernandes', deviceType: 'Android', status: 'community', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'george.fernandes@email.com', phone: '(808) 555-0134' },
    { id: '6-5', name: 'Linda Chen', deviceType: 'iPad', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'linda.chen@email.com', phone: '(808) 555-0135' },
    { id: '6-6', name: 'Charles Wong', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'charles.wong@email.com', phone: '(808) 555-0136' },
    { id: '6-7', name: 'Helen Rodriguez', deviceType: 'Android', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'helen.rodriguez@email.com', phone: '(808) 555-0137' },
    { id: '6-8', name: 'Paul Martinez', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'paul.martinez@email.com', phone: '(808) 555-0601' }
  ],

  // Wednesday, Dec 4 - 9:00 AM - iPhone Photo Organization (Small Group)
  '7': [
    { id: '7-1', name: 'Robert Tanaka', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'robert.tanaka@email.com', phone: '(808) 555-0124' },
    { id: '7-2', name: 'Patricia Kim', deviceType: 'Android', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'patricia.kim@email.com', phone: '(808) 555-0127' }
  ],

  // Wednesday, Dec 4 - 11:00 AM - Health Apps & Patient Portals (Group)
  '8': [
    { id: '8-1', name: 'Frank Tanaka', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'frank.tanaka@email.com', phone: '(808) 555-0208' },
    { id: '8-2', name: 'Betty Nakamura', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'betty.nakamura@email.com', phone: '(808) 555-0209' },
    { id: '8-3', name: 'Daniel Kim', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'daniel.kim@email.com', phone: '(808) 555-0210' },
    { id: '8-4', name: 'Nancy Silva', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'nancy.silva@email.com', phone: '(808) 555-0207' },
    { id: '8-5', name: 'Jennifer Lopez', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'jennifer.lopez@email.com', phone: '(808) 555-0301' },
    { id: '8-6', name: 'Michael Chen', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'michael.chen@email.com', phone: '(808) 555-0302' },
    { id: '8-7', name: 'Alice Yamamoto', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'alice.yamamoto@email.com', phone: '(808) 555-0401' },
    { id: '8-8', name: 'Karen Silva', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'karen.silva@email.com', phone: '(808) 555-0403' },
    { id: '8-9', name: 'Joseph Chen', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'joseph.chen@email.com', phone: '(808) 555-0408' },
    { id: '8-10', name: 'Maria Fernandez', deviceType: 'iPad', status: 'standard', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'maria.fernandez@email.com', phone: '(808) 555-0409' }
  ],

  // Wednesday, Dec 4 - 2:00 PM - Email Management (1:1 Virtual)
  '9': [
    { id: '9-1', name: 'James Wong', deviceType: 'iPad', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'james.wong@email.com', phone: '(808) 555-0128' }
  ],

  // Thursday, Dec 5 - 10:00 AM - Video Calling with Family (Group)
  '10': [
    { id: '10-1', name: 'Steven Rodriguez', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'steven.rodriguez@email.com', phone: '(808) 555-0402' },
    { id: '10-2', name: 'Richard Lee', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'richard.lee@email.com', phone: '(808) 555-0404' },
    { id: '10-3', name: 'Sandra Wong', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'sandra.wong@email.com', phone: '(808) 555-0405' },
    { id: '10-4', name: 'David Kim', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'david.kim@email.com', phone: '(808) 555-0406' },
    { id: '10-5', name: 'Laura Tanaka', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'laura.tanaka@email.com', phone: '(808) 555-0407' },
    { id: '10-6', name: 'Kenneth Nakamura', deviceType: 'Android', status: 'premium', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'kenneth.nakamura@email.com', phone: '(808) 555-0410' },
    { id: '10-7', name: 'Gary Santos', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'gary.santos@email.com', phone: '(808) 555-0412' }
  ],

  // Thursday, Dec 5 - 12:30 PM - Facebook Account Setup (1:1 In-Person)
  '11': [
    { id: '11-1', name: 'Mary Nakamura', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'mary.nakamura@email.com', phone: '(808) 555-0129' }
  ],

  // Thursday, Dec 5 - 3:00 PM - iPhone Basics for Beginners (Group)
  '12': [
    { id: '12-1', name: 'Helen Rodriguez', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'helen.rodriguez@email.com', phone: '(808) 555-0201' },
    { id: '12-2', name: 'George Fernandes', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'george.fernandes@email.com', phone: '(808) 555-0202' },
    { id: '12-3', name: 'Linda Chen', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'linda.chen@email.com', phone: '(808) 555-0203' },
    { id: '12-4', name: 'Charles Wong', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'charles.wong@email.com', phone: '(808) 555-0204' },
    { id: '12-5', name: 'Susan Yamamoto', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'susan.yamamoto@email.com', phone: '(808) 555-0205' },
    { id: '12-6', name: 'Paul Martinez', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'paul.martinez@email.com', phone: '(808) 555-0206' },
    { id: '12-7', name: 'Nancy Silva', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'nancy.silva@email.com', phone: '(808) 555-0207' },
    { id: '12-8', name: 'Frank Tanaka', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'frank.tanaka@email.com', phone: '(808) 555-0208' },
    { id: '12-9', name: 'Betty Nakamura', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'betty.nakamura@email.com', phone: '(808) 555-0209' },
    { id: '12-10', name: 'Daniel Kim', deviceType: 'iPhone', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'daniel.kim@email.com', phone: '(808) 555-0210' },
    { id: '12-11', name: 'Deborah Martinez', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'deborah.martinez@email.com', phone: '(808) 555-0411' }
  ],

  // Friday, Dec 6 - 9:00 AM - Online Banking Help (Small Group)
  '13': [
    { id: '13-1', name: 'Thomas Martinez', deviceType: 'iPad', status: 'basic', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'thomas.martinez@email.com', phone: '(808) 555-0132' },
    { id: '13-2', name: 'Barbara Fernandez', deviceType: 'iPhone', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'barbara.fernandez@email.com', phone: '(808) 555-0131' }
  ],

  // Friday, Dec 6 - 11:00 AM - Password Management Made Easy (Group)
  '14': [
    { id: '14-1', name: 'Jennifer Lopez', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'jennifer.lopez@email.com', phone: '(808) 555-0301' },
    { id: '14-2', name: 'Michael Chen', deviceType: 'iPhone', status: 'premium', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'michael.chen@email.com', phone: '(808) 555-0302' },
    { id: '14-3', name: 'Alice Yamamoto', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'alice.yamamoto@email.com', phone: '(808) 555-0401' },
    { id: '14-4', name: 'Steven Rodriguez', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'steven.rodriguez@email.com', phone: '(808) 555-0402' },
    { id: '14-5', name: 'Karen Silva', deviceType: 'iPhone', status: 'basic', accessibilityNeeds: { vision: false, hearing: true, mobility: false }, email: 'karen.silva@email.com', phone: '(808) 555-0403' },
    { id: '14-6', name: 'Richard Lee', deviceType: 'Android', status: 'standard', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'richard.lee@email.com', phone: '(808) 555-0404' },
    { id: '14-7', name: 'Sandra Wong', deviceType: 'iPhone', status: 'community', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'sandra.wong@email.com', phone: '(808) 555-0405' },
    { id: '14-8', name: 'David Kim', deviceType: 'iPad', status: 'new', accessibilityNeeds: { vision: false, hearing: false, mobility: false }, email: 'david.kim@email.com', phone: '(808) 555-0406' },
    { id: '14-9', name: 'Laura Tanaka', deviceType: 'Android', status: 'returning', accessibilityNeeds: { vision: true, hearing: false, mobility: false }, email: 'laura.tanaka@email.com', phone: '(808) 555-0407' }
  ],

  // Friday, Dec 6 - 2:00 PM - iPhone Calendar & Reminders (1:1 Virtual)
  '15': [
    { id: '15-1', name: 'William Lee', deviceType: 'iPhone', status: 'returning', accessibilityNeeds: { vision: true, hearing: true, mobility: false }, email: 'william.lee@email.com', phone: '(808) 555-0126' }
  ]
};

// Helper function to get unique student count across all classes this week
function getUniqueStudentCount(): number {
  const uniqueEmails = new Set<string>();

  Object.values(CLASS_ROSTERS).forEach(roster => {
    roster.forEach(student => {
      if (student.email) {
        uniqueEmails.add(student.email);
      }
    });
  });

  return uniqueEmails.size;
}

// Helper function to get total class count
function getTotalClassCount(): number {
  return Object.keys(CLASS_ROSTERS).length;
}

// Helper function to get roster for a class
export default function getRosterForClass(classId: string): Student[] {
  return CLASS_ROSTERS[classId] || [];
}

// Also export as named export for flexibility
export { getRosterForClass, getUniqueStudentCount, getTotalClassCount };
