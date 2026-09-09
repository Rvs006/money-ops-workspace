import React,{useId,useState} from 'react';
import {DrawablyButton as Button,DrawablyInput as Input,DrawablySelect as Select} from 'drawably/react';
const rateOptions=[{value:'reducing',label:'Reducing balance'},{value:'flat',label:'Flat rate'}];

export function Action({children,...props}){return <Button boil={false} roughness={.4} {...props}>{children}</Button>}
export function Field({label,value,onChange,options,hint,status='M',type='number',min=0,max,step='any',disabled=false,...inputProps}){
 const id=useId(),[error,setError]=useState('');
 const {onBlur,onInvalid,'aria-describedby':describedBy,...nativeProps}=inputProps;
 const describe=[describedBy,hint?id+'-hint':null,error?id+'-error':null].filter(Boolean).join(' ')||undefined;
 const validate=e=>setError(e.target.validity.valid?'':e.target.validity.valueMissing?'Complete this field.':e.target.validationMessage);
 const shared={...nativeProps,disabled,value,required:status!=='O'&&status!=='L','aria-describedby':describe,'aria-invalid':error?true:undefined,onChange:e=>{setError('');onChange?.(e.target.value)},onBlur:e=>{validate(e);onBlur?.(e)},onInvalid:e=>{validate(e);onInvalid?.(e)}};
 return <label className="field"><span>{label}<small className="field-status">{status==='O'?'Optional':status==='L'?'Locked':status==='D'?'Default · editable':'Required'}</small></span>{options?<Select {...shared} boil={false} roughness={.3}>{options.map(o=><option key={typeof o==='string'?o:o.value} value={typeof o==='string'?o:o.value}>{typeof o==='string'?o:o.label}</option>)}</Select>:<Input {...shared} boil={false} roughness={.3} type={type} min={min} max={max} step={step}/>} {hint&&<small id={id+'-hint'}>{hint}</small>}{error&&<small id={id+'-error'} className="field-error" role="alert">{error}</small>}</label>
}
export function Slider({label,value,onChange,min=0,max=30,step=.5,suffix='%',...inputProps}){return <label className="slider"><span>{label}<strong>{value}{suffix}</strong></span><input {...inputProps} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(e.target.value)}/></label>}
export function Fact({label,value,...props}){return <div {...props} className="fact"><span>{label}</span><strong>{value}</strong></div>}
export function RateField({value,set,loanType}){return <Field label="Rate calculation" value={loanType==='Home loan'?'reducing':value} onChange={set} options={rateOptions} status={loanType==='Home loan'?'L':'D'} disabled={loanType==='Home loan'} hint={loanType==='Home loan'?'Home loans use reducing balance here.':'Reducing assumed. Check your lender’s rate basis; a flat rate is not directly comparable.'}/>}
export function TermField({value,unit,setValue,setUnit,label='Tenure'}){return <div className="term-fields"><Field label={label} value={value} onChange={setValue} min={1} step={1}/><Field label="Unit" value={unit} onChange={setUnit} options={['months','years']} status="D"/></div>}
export function FeeField({value,basis,setValue,setBasis,label}){return <div className="term-fields"><Field label={label} value={value} onChange={setValue}/><Field label="Fee basis" value={basis} onChange={setBasis} options={[{value:'percent',label:'Percent (%)'},{value:'flat',label:'Amount (₹)'}]} status="D"/></div>}
export function Disclosure({title,children,...props}){return <details {...props} className="input-disclosure"><summary>{title}</summary><div className="disclosure-content">{children}</div></details>}
