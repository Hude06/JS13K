import { ParticleEngine } from "./particalEngine.js";
const rowPattern = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const emptyRow = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1];
const FullEmptyRow = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const emptyRowLedge = [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1];
const emptyRowLedgeOther = [1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1];

let zzfxR=44100

const GameLevel1 = [

]
const Intro = [
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    emptyRowLedge,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    emptyRowLedgeOther,
    FullEmptyRow,
    FullEmptyRow,
    rowPattern,
    rowPattern,
]
export const GameLevel1Options = {
    level: GameLevel1,
    tint: {
        r: 200,
        g: 200,
        b: 0
    },
    song: [[[,0,77,,,.7,2,.41,,,,,,,,.06],[,0,43,.01,,.3,2,,,,,,,,,.02,.01],[,0,170,.003,,.008,,.97,-35,53,,,,,,.1],[.8,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],[,0,86,,,,,.7,,,,.5,,6.7,1,.05],[,0,41,,.05,.4,2,0,,,9,.01,,,,.08,.02],[,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],[.3,0,16,,,.3,3]],[[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,22,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,24,,,,,,,,,,,,,,,,,,,,,,,,22,,22,,22,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,24,,,,,,,,27,,,,,,,,,,,,,,,,27,,,,24,,,,24,,,,,,,,27,,,,,,,,,,,,,,,,24,,24,,24,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[6,1,,,34,34,34,,,,,,34,34,,,,,34,,,,34,34,,,,,34,,,,34,,,,34,34,34,,,,,,34,,,,,,34,34,,,34,34,,,,,,,,,34,34],[4,1,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,23,23,35,23,23,36,23,23,35,23,23,36,23,23,35,35,23,23,35,23,23,35,23,23,36,23,23,35,23,23,36,36],[5,-1,21,,,19,,,21,,,,,,,,,,21,,,19,,,17,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[3,1,24,,,24,,,24,,,,,,,,,,24,,,24,,,24,,,,24.75,24.5,24.26,24.01,24.01,24.01,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[4,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,24.75,24.5,24.26,24.01,24.01,24.01,24.01,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,23,,21,23,,35,,23,,21,23,,35,,35,,23,,21,23,,35,,21,23,,35,,21,23,,,],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,36,34,,33,34,34,36,31,36,34,,31,34,32,,33,36,34,,31,34,34,36,33,36,33,,31,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,21,,19,21,,33,,21,,19,21,,33,,33,,21,,19,21,,33,,21,,19,21,,33,,33,,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29],[2,1,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,],[6,1,,,36,,,,,,36,,36,,,,,,,,36,,,,,,36,,36,,,,,,,,36,,,,,,,,,,,,,,,,36,,,,,,36,,36,,,,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,25,,,25,,,,,,,,25,,,,,,,,25,25,25,25]],[[1,-1,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,19,19,31,19,19,31,19,19,31,19,19,31,19,19,31,31],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,36,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,19,,19,19,31,19,19,31,19,,19,19,31,19,19,31],[2,1,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,,,,,,34,,34,,,,,,,,34,,,,,,34,,34,,,,,,]]],[0,1,1,2,3,4,4],,{"title":"Depp","Notes":"Unknown author"}],
}
export const IntroOptions = {
    level: Intro,
    tint: {
        r: 255,
        g: 0,
        b: 0
    },
    song: [[[,0,77,,,.7,2,.41,,,,,,,,.06],[,0,43,.01,,.3,2,,,,,,,,,.02,.01],[,0,170,.003,,.008,,.97,-35,53,,,,,,.1],[.8,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],[,0,86,,,,,.7,,,,.5,,6.7,1,.05],[,0,41,,.05,.4,2,0,,,9,.01,,,,.08,.02],[,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],[.3,0,16,,,.3,3]],[[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,22,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,24,,,,,,,,,,,,,,,,,,,,,,,,22,,22,,22,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33],[3,1,24,,,,,,,,27,,,,,,,,,,,,,,,,27,,,,24,,,,24,,,,,,,,27,,,,,,,,,,,,,,,,24,,24,,24,,,,],[5,-1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[,1,21,,,,,,,,,,,,,,,,,,,,,,,,,,,,24,,,,23,,,,,,,,,,,,,,,,,,,,,,,,24,,23,,21,,,,],[6,1,,,34,34,34,,,,,,34,34,,,,,34,,,,34,34,,,,,34,,,,34,,,,34,34,34,,,,,,34,,,,,,34,34,,,34,34,,,,,,,,,34,34],[4,1,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,,,,,,,24,,,,,,24,,24,,,,24,,,,24,,,,,,,,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,23,23,35,23,23,36,23,23,35,23,23,36,23,23,35,35,23,23,35,23,23,35,23,23,36,23,23,35,23,23,36,36],[5,-1,21,,,19,,,21,,,,,,,,,,21,,,19,,,17,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[3,1,24,,,24,,,24,,,,,,,,,,24,,,24,,,24,,,,24.75,24.5,24.26,24.01,24.01,24.01,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[4,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,24.75,24.5,24.26,24.01,24.01,24.01,24.01,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,23,,21,23,,35,,23,,21,23,,35,,35,,23,,21,23,,35,,21,23,,35,,21,23,,,],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,36,34,,33,34,34,36,31,36,34,,31,34,32,,33,36,34,,31,34,34,36,33,36,33,,31,,,]],[[1,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,21,,19,21,,33,,21,,19,21,,33,,33,,21,,19,21,,33,,21,,19,21,,33,,33,,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29],[2,1,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,34,34,,34,,,],[6,1,,,36,,,,,,36,,36,,,,,,,,36,,,,,,36,,36,,,,,,,,36,,,,,,,,,,,,,,,,36,,,,,,36,,36,,,,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,25,,,25,,,,,,,,25,,,,,,,,25,25,25,25]],[[1,-1,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,14,14,26,14,14,26,14,14,26,14,14,26,14,14,26,26,17,17,29,17,17,29,17,17,29,17,17,29,17,17,29,29,19,19,31,19,19,31,19,19,31,19,19,31,19,19,31,31],[4,1,24,24,,24,24,,24,24,24,24,,24,24,,24,,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,24,24,24,24,,24,24,,36,,24,24,,24,24,,24,24,24,24,,24,24,,24,24],[7,-1,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,14,,14,14,26,14,14,26,17,,17,17,29,17,17,29,17,,17,17,29,17,17,29,19,,19,19,31,19,19,31,19,,19,19,31,19,19,31],[2,1,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,36,36,,36,,,],[3,1,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25,,,,,25,,,,,,,,25,,,,,,,,25,,,,,,,,25,25,25,25],[6,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34,,,,,,34,,34,,,,,,,,34,,,,,,34,,34,,,,,,]]],[0,1,1,2,3,4,4],,{"title":"Depp","Notes":"Unknown author"}],
}
export class Globals {
    constructor() {
        this.boss = []
        this.currentKey = new Map();
        this.mobsLeft = 0;
        this.blocks = [];
        this.SCROLLX = 200;
        this.debug = true;
        this.SCROLLY = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.bullets = [];
        this.mouseClicked = false
        this.debugBlocks = []
        this.enemys = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.PlayerToBig = false;
        this.BLOCKSIZE = 32;
        this.currentScreen = "splash";
        this.type_distance = 0;
        this.flicking = 0;
        this.currentUrl = window.location.href;
        this.baseUrl = new URL(this.currentUrl).origin;
        this.timePlayed = 0;
        this.navKey = new Map();
        this.currentLevel = null;
        this.particleEngine = new ParticleEngine(this.ctx, {
            color: 'red',
            size: 3,
            count: 100,
            duration: 0.5// 2 seconds
        });
        this.GameLevel1Options = GameLevel1Options
        this.IntroOptions = IntroOptions
        this.zzfx=(...t)=>this.zzfxP(this.zzfxG(...t))

        // zzfxP() - the sound player -- returns a AudioBufferSourceNode
        this.zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination),e.start();return e}
        
        // zzfxG() - the sound generator -- returns an array of sample data
        this.zzfxG=(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);return Z}
        
        this.zzfxV=.3
        
        
        this.zzfxX=new(window.AudioContext||webkitAudioContext);


        this.zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?this.zzfxG(...l):[])))}m=G});return[b,j]}
        
        
    }

    reset() {
        location.reload();
    }
}



export let // ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.1 by Frank Force ~ 1000 bytes
zzfxV=.3,               // volume
zzfxX=new AudioContext, // audio context
zzfx=                   // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0
,N=0)=>{let M=Math,d=2*M.PI,R=44100,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,
g=0,H=0,a=0,n=1,I=0,J=0,f=0,h=N<0?-1:1,x=d*h*N*2/R,L=M.cos(x),Z=M.sin,K=Z(x)/4,O=1+K,
X=-2*L/O,Y=(1-K)/O,P=(1+h*L)/2/O,Q=-(h+L)/O,S=P,T=0,U=0,V=0,W=0;e=R*e+9;m*=R;r*=R;t*=
R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;p*=zzfxV;for(h=e+m+r+t+c|0;a<h;k[a++]
=f*p)++J%(100*F|0)||(f=q?1<q?2<q?3<q?Z(g**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)
%2:1-4*M.abs(M.round(g/d)-g/d):Z(g),f=(l?1-B+B*Z(d*a/l):1)*(f<0?-1:1)*M.abs(f)**D*(a<
e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h
-a)/c)*k[a-c|0]/2/p):f,N?f=W=S*T+Q*(T=U)+P*(U=f)-Y*V-X*(V=W):0),x=(b+=u+=y)*M.cos(A*
H++),g+=x+x*E*Z(a**5),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.
createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();
b.buffer=p;b.connect(zzfxX.destination);b.start()}

