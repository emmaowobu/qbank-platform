// Insert MCCQE-style questions into Supabase

import { supabase } from '../utils/supabaseClient';

const questions = [
  {
    question_text:
      'A 55-year-old man presents with crushing chest pain radiating to the left arm. ECG shows ST elevation in V1–V4. What is the most likely cause?',
    option_a: 'Aortic dissection',
    option_b: 'Pericarditis',
    option_c: 'Anterior myocardial infarction',
    option_d: 'Pulmonary embolism',
    option_e: 'Costochondritis',
    correct_option: 'C',
    topic: 'Cardiology',
    difficulty: 'moderate',
    explanation: 'ST elevation in V1–V4 suggests anterior MI.',
  },
  {
    question_text:
      'A 50-year-old man presents to your clinic and asks you about options regarding smoking cessation. He has a 20 pack-year smoking history. Which one of the following is the most effective strategy?',
    option_a: 'E-cigarettes',
    option_b: 'Varenicline',
    option_c: 'Counselling and pharmacotherapy',
    option_d: 'Acupuncture',
    option_e: 'Nicotine patches',
    correct_option: 'C',
    topic: 'Health Prevention and Promotion',
    difficulty: 'moderate',
    explanation:
      'Evidence shows that combination therapy of counselling and pharmacotherapy is the most effective strategy for smoking cessation.',
  },
  {
    question_text:
      'Which one of the following is the main argument put forward in support of physician payment based on fee for service?',
    option_a: 'It allows governments to more accurately anticipate the total cost',
    option_b: 'It encourages delivery of preventive services',
    option_c: 'It encourages physicians to follow clinical practice guidelines',
    option_d: 'It encourages physicians to work in teams to share facilities',
    option_e: 'It respects the physician as an independent contractor',
    correct_option: 'E',
    topic: 'Ethics',
    difficulty: 'hard',
    explanation:
      'Fee-for-service payment is aligned with the model of the physician as an independent contractor.',
  },
  {
    question_text:
      'A 73-year-old man presents to your clinic with a lump in his right groin. He denies pain but reports recent issues with constipation. On examination, he has an obvious right inguinal hernia that is easily reducible. Which one of the following findings on further questioning would be most helpful in establishing the diagnosis?',
    option_a: 'Family history of hernias',
    option_b: 'History of groin injury',
    option_c: 'Numbness of anterior thigh',
    option_d: 'Postprandial dyspepsia',
    option_e: 'History of rectal bleeding',
    correct_option: 'E',
    topic: 'General Surgery',
    difficulty: 'hard',
    explanation:
      'Change in bowel habits is the most common presenting symptom of colon cancer. A history of rectal bleeding is the most pertinent question.',
  },
]

async function insertQuestions() {
  const { error } = await supabase.from('questions').insert(questions)

  if (error) {
    console.error('\u274c Failed to insert questions:', error.message)
  } else {
    console.log('\u2705 MCCQE questions inserted successfully')
  }
}

insertQuestions()
