import React, {useState, useEffect} from 'react';

import AlamatController from '../Controller/Alamat';
import SaveController from '../Controller/Save';

export default function Index(){            

    const [AC] = useState(new AlamatController());
    const [SC] = useState(new SaveController());
    
    const [prov, setProv] = useState([]);
    const [city, setCity] = useState([]);
    const [kec, setKec] = useState([]);
    const [desa, setDesa] = useState([]);    

    const [txtRegis, seTxtRegis] = useState("");
    const [txtName, seTxtName] = useState("");    
    const [txtCallName, seTxtCallName] = useState("");

    const [optionProv, setOptionProv] = useState(0); 
    const [optionCity, setOptionCity] = useState(0); 
    const [optionKec, setOptionKec] = useState(0); 
    const [optionDesa, setOptionDesa] = useState(0);     

    const [txtSchool, seTxtSchool] = useState("");
    const [txtClass, seTxtClass] = useState(0);
    const [txtJurusan, seTxtJurusan] = useState("");

    const [txtHp, seTxtHp] = useState("");
    const [txtEmail, seTxtEmail] = useState("");

    const [txtMsg, seTxtMsg] = useState("");

    const Data = 
    {        
        noreg: txtRegis,
        full_name: txtName,
        nick_name: txtCallName,

        address: `Kelurahan ${desa}, Kecamatan ${kec}, Kota/Kab ${city}, Provinsi ${prov} Indonesia`,

        school: txtSchool,
        class: txtClass,
        vocation: txtJurusan,        

        phone_number: txtHp,
        email: txtEmail,

        know_from: "",
        feedback: txtMsg 
    }

    useEffect(()=>{
        (async()=>{                        
            let prv = await AC.getProv();                           
            setProv(prv.data.semuaprovinsi);            
        })();        
    },[AC]);

    useEffect(()=>{
        (async()=>{            
            let cty = await AC.getKota(optionProv);            
            (cty.data.kabupatens == null) ? setCity([]) :  setCity(cty.data.kabupatens)            
        })();
    },[optionProv, AC]);

    useEffect(()=>{
        (async()=>{            
            let kec = await AC.getKec(optionCity);            
            (kec.data.kecamatans == null) ? setKec([]) : setKec(kec.data.kecamatans)            
        })();
    },[optionCity, AC]);

    useEffect(()=>{
        (async()=>{            
            let des = await AC.getDes(optionKec);            
            (des.data.desas == null) ? setDesa([]) : setDesa(des.data.desas)            
        })();
    },[optionKec, AC]);    
    
    const convertOption = async () => {                    

        await prov.map((res)=>{                                    
            if(res.id === optionProv){
                setProv(res.nama);
            }            
        });

        await city.map((res)=>{                                    
            if(res.id === optionCity){
                setCity(res.nama);
            }            
        });

        await kec.map((res)=>{                                    
            if(res.id === optionKec){
                setKec(res.nama);
            }            
        });

        await desa.map((res)=>{                                    
            if(res.id === optionDesa){
                setDesa(res.nama);
            }            
        });

    }

    const atClickSave = async () => {
        
        await convertOption();        

        if(txtRegis !== "" && txtName !== "" && txtCallName !== "" && optionProv !== 0 && optionCity !== 0 && optionKec !== 0 && optionDesa !== 0 && txtSchool !== "" && txtClass !== 0 && txtJurusan !== "" && txtEmail !== "" && txtHp !== 0 && txtMsg !== ""){
            console.log(Data);
            let sta = await SC.saveTiket(Data);
            (sta === true) ? window.print() : console.log("Error in api save");
        }
        else{alert("Mohon melengkapi data terlebih dahulu.");}

    }

    return(
        <div className="BodIndex">
            <div className="container">

                <div className="col1">
                    <div className="box">
                        <div className="group">
                            <div className="txt-title">
                                <span>Selamat Datang!</span>
                            </div>              
                            <div className="group-print" id="group-print">
                                <div className="txt-data">
                                    <span><b>Selamat Datang</b> di Edu Fair 2020 MGMP BK SMA KOTA BEKASI</span>
                                </div>
                                <div className="txt-data">
                                    <span>{`NO REG : ${txtRegis}`}</span>
                                </div>    
                                <div className="txt-data">
                                    <span>{`Nama : ${txtName} (${txtCallName})`}</span>
                                </div>                                                             
                            </div>                                                        
                        </div>
                        <div className="group2">
                            <div className="txt-title">
                                <span>Selamat Datang!</span>
                            </div>              
                            <div className="group-print" id="group-print">
                                <div className="txt-data">
                                    <span><b>Selamat Datang</b> di Edu Fair 2020 MGMP BK SMA KOTA BEKASI</span>
                                </div>
                                <div className="txt-data">
                                    <span>{`NO REG : ${txtRegis}`}</span>
                                </div>    
                                <div className="txt-data">
                                    <span>{`Nama : ${txtName} (${txtCallName})`}</span>
                                </div>                                                             
                            </div>                                                        
                        </div>
                    </div>
                </div>

                <div className="col2">
                    <div className="box">
                        <div className="group">
                            <div className="row1">
                                
                                <p className="txt-title">
                                    Data Pribadi
                                </p>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">No registrasi</span>
                                </div>
                                <div className="input-group">
                                    <input type="number" className="" value={txtRegis} onChange={(e)=>seTxtRegis(e.target.value)} />
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Nama Lengkap</span>
                                </div>
                                <div className="input-group">
                                    <input type="text"  className="" value={txtName} onChange={(e)=>{seTxtName(e.target.value)}} />
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Nama Panggilan</span>
                                </div>
                                <div className="input-group">
                                    <input type="text"  className="" value={txtCallName} onChange={(e)=>{seTxtCallName(e.target.value)}} />
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Provinsi</span>
                                </div>
                                <div className="input-group">
                                    <select value={optionProv} onChange={(e)=>setOptionProv(e.target.value)}>
                                        <option className="option">Choose..</option>
                                        {
                                            prov.map((res) =>
                                                <option className="option" key={res.id} value={res.id}> {res.nama} </option>                                        
                                            )
                                        }
                                    </select>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Kota atau Kabupaten</span>
                                </div>
                                <div className="input-group">
                                    <select value={optionCity} onChange={(e)=>setOptionCity(e.target.value)}>
                                        <option className="option">Choose..</option>
                                        {
                                            city.map((res)=>
                                                <option className="option" key={res.id} value={res.id}> {res.nama} </option>
                                            )
                                        }
                                    </select>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Kecamatan</span>
                                </div>
                                <div className="input-group">
                                    <select value={optionKec} onChange={(e)=>setOptionKec(e.target.value)}>
                                        <option className="option">Choose..</option>
                                        {
                                            kec.map((res)=>
                                                <option className="option" key={res.id} value={res.id}> {res.nama} </option>
                                            )
                                        }
                                    </select>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Kelurahan</span>
                                </div>
                                <div className="input-group">
                                    <select value={optionDesa} onChange={(e)=>setOptionDesa(e.target.value)}>
                                        <option className="option">Choose..</option>
                                        {
                                            desa.map((res)=>
                                                <option className="option" key={res.id} value={res.id}> {res.nama} </option>
                                            )
                                        }
                                    </select> 
                                </div>                                                        

                            </div>
                            <div className="row2">
                                
                                <p className="txt-title">
                                    Data Sekolah
                                </p>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Asal Sekolah</span>
                                </div>
                                <div className="input-group">
                                    <input type="text"  className="" value={txtSchool} onChange={(e)=>{seTxtSchool(e.target.value)}}/>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Kelas</span>
                                </div>
                                <div className="input-group">
                                    <select value={txtClass} onChange={(e)=>{seTxtClass(e.target.value)}}>
                                        <option> Choose.. </option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Jurusan</span>
                                </div>
                                <div className="input-group">
                                    <select value={txtJurusan} onChange={(e)=>{seTxtJurusan(e.target.value)}}>
                                        <option> Choose.. </option>
                                        <option value="IPA">IPA</option>
                                        <option value="IPS">IPS</option>
                                        <option value="BAHASA">BAHASA</option>
                                    </select>
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">No Handphone</span>
                                </div>
                                <div className="input-group">
                                    <input type="number"  className="" value={txtHp} onChange={(e)=>{seTxtHp(e.target.value)}} />
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Email</span>
                                </div>
                                <div className="input-group">
                                    <input type="email"  className="" value={txtEmail} onChange={(e)=>{seTxtEmail(e.target.value)}} />
                                </div>
                                
                                <div className="txt-group">
                                    <span className="txt-captions">Kesan dan Pesan</span>
                                </div>
                                <div className="input-group">
                                    <textarea  className="" cols="30" rows="10" value={txtMsg} onChange={(e)=>{seTxtMsg(e.target.value)}}>

                                    </textarea>
                                </div>                                

                            </div>
                            
                            <div className="btn-group">
                                <button className="btn-print" onClick={()=>{atClickSave()}}>
                                    Save and Print
                                </button>
                            </div>

                        </div>
                    </div>
                </div>                

            </div>
        </div>
    )
}