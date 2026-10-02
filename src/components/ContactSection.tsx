import React, { useState } from 'react';
import { CompanyContact, ThemeColor } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { Mail, Phone, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  contact: CompanyContact;
  theme: ThemeColor;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  theme,
}) => {
  const themeCfg = THEME_CONFIGS[theme] || THEME_CONFIGS.beige;
  const isBeige = theme === 'beige';
  const inputFocusCls = isBeige
    ? 'focus:outline-none focus:border-[#9c7141] focus:ring-1 focus:ring-[#9c7141]'
    : 'focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: '法人ソリューションについて',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      category: '法人ソリューションについて',
      message: '',
    });
  };

  return (
    <section id="contact" className={`py-24 ${themeCfg.sectionAltBg || 'bg-[#f4efe6]'} text-slate-800 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${themeCfg.badge}`}>
              <Mail className="w-3.5 h-3.5" />
              <span>CONTACT & INQUIRIES</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${themeCfg.headingText || 'text-slate-900'} font-mincho`}>
              {contact.formTitle || 'お問い合わせ・ご相談'}
            </h2>
            <p className={`${themeCfg.subheadingText || 'text-slate-600'} text-sm sm:text-base leading-relaxed`}>
              {contact.formDescription || '当社の事業・サービスに関するご質問、お見積もりのご相談など、お気軽にお問い合わせください。'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl p-7 space-y-6 shadow-xs`}>
              <h3 className={`text-lg font-bold ${themeCfg.cardTitleText || 'text-slate-900'} font-mincho`}>
                お電話・メール窓口
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium">お電話でのお問い合わせ</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className={`text-xl font-bold text-slate-900 hover:opacity-80 flex items-center gap-2 transition-colors font-sans`}
                  >
                    <Phone className={`w-4 h-4 ${themeCfg.accentText}`} />
                    <span>{contact.phone}</span>
                  </a>
                  <p className="text-[11px] text-slate-500">{contact.hours}</p>
                </div>

                <div className="space-y-1 border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-500 font-medium">メールでのお問い合わせ</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className={`text-sm font-semibold ${themeCfg.accentText} hover:underline flex items-center gap-2 font-mono break-all`}
                  >
                    <Mail className={`w-4 h-4 ${themeCfg.accentText} shrink-0`} />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-amber-200 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>個人情報の保護について</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {contact.privacyNote || 'ご入力いただいた個人情報は、お問い合わせへの回答および情報提供の目的にのみ使用し、厳重に管理いたします。'}
              </p>
            </div>

          </div>

          {/* Right: Contact Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className={`bg-white border ${themeCfg.borderColor || 'border-slate-200'} rounded-2xl p-7 sm:p-10 shadow-xs`}>
              
              {isSuccess ? (
                <div className="py-12 px-4 text-center space-y-5 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 font-mincho">
                      お問い合わせを受け付けました
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      この度はお問い合わせいただき、誠にありがとうございます。<br />
                      内容を確認のうえ、担当者より通常1〜2営業日以内にご連絡差し上げます。
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      新しいお問い合わせを作成する
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>お名前 <span className="text-rose-500">*</span></span>
                        <span className="text-[10px] text-slate-400 font-normal">必須</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="山田 太郎"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm ${inputFocusCls} transition-colors`}
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        貴社名・組織名
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="株式会社〇〇"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm ${inputFocusCls} transition-colors`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>メールアドレス <span className="text-rose-500">*</span></span>
                        <span className="text-[10px] text-slate-400 font-normal">必須</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm ${inputFocusCls} transition-colors`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        お電話番号
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="03-0000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm ${inputFocusCls} transition-colors`}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      お問い合わせ種別
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm ${inputFocusCls}`}
                    >
                      <option value="法人ソリューションについて">法人ソリューションについて</option>
                      <option value="提携・協業のご相談">提携・協業のご相談</option>
                      <option value="お見積もり・資料請求">お見積もり・資料請求</option>
                      <option value="採用について">採用について</option>
                      <option value="取材・メディア掲載について">取材・メディア掲載について</option>
                      <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>お問い合わせ内容 <span className="text-rose-500">*</span></span>
                      <span className="text-[10px] text-slate-400 font-normal">必須</span>
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      placeholder="ご相談内容の詳細をご記入ください。"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm ${inputFocusCls} resize-y`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg ${themeCfg.secondaryBg} font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50`}
                    >
                      {isSubmitting ? (
                        <span>送信中...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>お問い合わせを送信する</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
