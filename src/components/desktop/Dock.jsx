const LINKS = [
  { label: 'Gmail',    bg: 'transparent', img: '/logos/gmail1.png',     action: 'mailto:mcnabtg@gmail.com' },
  { label: 'Spotify',  bg: 'transparent', img: '/logos/spotify1.png',   action: 'https://open.spotify.com/user/fkf56byd45x163u60tnzl2prl' },
  { label: 'LinkedIn', bg: 'transparent', img: '/logos/linkedin1.png',  action: 'https://www.linkedin.com/in/ishan-mcnab/' },
  { label: 'Book Log', bg: 'transparent', img: '/logos/instagram1.webp', action: 'booklog' },
  { label: 'InHabit',  bg: 'transparent', img: '/logos/inhabit.png',   action: 'https://inhabit-app-two.vercel.app/' },
  { label: 'Tinkren',  bg: 'transparent', img: '/logos/tinkren.jpg',   action: 'https://tinkren.com/' },
]

function DockItem({ children, label, onClick }) {
  return (
    <div
      style={{ position:'relative', width:52, height:52, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-10px) scale(1.18)'; e.currentTarget.querySelector('.tip').style.opacity='1' }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.querySelector('.tip').style.opacity='0' }}
    >
      {children}
      <div className="tip" style={{ position:'absolute', bottom:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.85)', color:'#efefef', fontFamily:'JetBrains Mono,monospace', fontSize:10, padding:'3px 8px', borderRadius:4, border:'1px solid #2a2a2a', whiteSpace:'nowrap', pointerEvents:'none', zIndex:300, opacity:0, transition:'opacity 0.15s' }}>{label}</div>
    </div>
  )
}

export default function Dock({ openApp, onContactClick }) {
  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, height:52, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(18,18,18,0.82)', borderTop:'1px solid #383838', backdropFilter:'blur(20px)', zIndex:200, paddingBottom:4 }}>
      <div style={{ display:'flex', flexDirection:'row', alignItems:'center', gap:10 }}>
        {LINKS.map(link => (
          <DockItem
            key={link.label}
            label={link.label}
            onClick={() => {
              if (link.action === 'booklog') { openApp('booklog'); return }
              if (link.label === 'Gmail') { onContactClick(); return }
              if (link.action.startsWith('mailto')) { window.location.href = link.action; return }
              window.open(link.action, '_blank', 'noopener,noreferrer')
            }}
          >
            <img src={link.img} alt={link.label} style={{ width:36, height:36, objectFit:'contain', borderRadius:12 }} />
          </DockItem>
        ))}
      </div>
    </div>
  )
}
