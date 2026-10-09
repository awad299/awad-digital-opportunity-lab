import './style.css'

const scoreBtn = document.querySelector('#scoreBtn')
const scoreEl = document.querySelector('#score')
const labelEl = document.querySelector('#scoreLabel')

scoreBtn?.addEventListener('click', () => {
  const budget = Number(document.querySelector('#budget').value)
  const timing = Number(document.querySelector('#timing').value)
  const decision = document.querySelector('#decision').checked ? 25 : 0
  const score = Math.min(100, budget + timing + decision)
  scoreEl.textContent = `${score}/100`
  if (score >= 75) labelEl.textContent = 'أولوية عالية — تواصل مباشر الآن'
  else if (score >= 50) labelEl.textContent = 'مؤهل — ضعه في متابعة نشطة'
  else labelEl.textContent = 'يحتاج رعاية أكثر قبل البيع المباشر'
})
