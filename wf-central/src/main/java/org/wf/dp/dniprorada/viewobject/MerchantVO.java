package org.wf.dp.dniprorada.viewobject;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.wf.dp.dniprorada.model.Merchant;
import org.wf.dp.dniprorada.model.SubjectOrgan;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * User: goodg_000
 * Date: 10.07.2015
 * Time: 1:27
 */
public class MerchantVO {
   private Long nID;
   private String sID;
   private String sURL_CallbackStatusNew;
   private String sURL_CallbackPaySuccess;
   private Long nID_SubjectOrgan;

   public MerchantVO() {
   }

   public MerchantVO(Merchant merchant) {
      nID = merchant.getId();
      sID = merchant.getsID();
      sURL_CallbackStatusNew = merchant.getsURL_CallbackStatusNew();
      sURL_CallbackPaySuccess = merchant.getsURL_CallbackPaySuccess();
      if (merchant.getOwner() != null) {
         nID_SubjectOrgan = merchant.getOwner().getId();
      }
   }

   public Long getnID() {
      return nID;
   }

   public String getsID() {
      return sID;
   }

   public String getsURL_CallbackStatusNew() {
      return sURL_CallbackStatusNew;
   }

   public String getsURL_CallbackPaySuccess() {
      return sURL_CallbackPaySuccess;
   }

   public Long getnID_SubjectOrgan() {
      return nID_SubjectOrgan;
   }

   public void setnID(Long nID) {
      this.nID = nID;
   }

   public void setsID(String sID) {
      this.sID = sID;
   }

   public void setsURL_CallbackStatusNew(String sURL_CallbackStatusNew) {
      this.sURL_CallbackStatusNew = sURL_CallbackStatusNew;
   }

   public void setsURL_CallbackPaySuccess(String sURL_CallbackPaySuccess) {
      this.sURL_CallbackPaySuccess = sURL_CallbackPaySuccess;
   }

   public void setnID_SubjectOrgan(Long nID_SubjectOrgan) {
      this.nID_SubjectOrgan = nID_SubjectOrgan;
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;

      if (o == null || getClass() != o.getClass()) return false;

      MerchantVO that = (MerchantVO) o;

      return new EqualsBuilder()
              .append(nID, that.nID)
              .append(sID, that.sID)
              .append(sURL_CallbackStatusNew, that.sURL_CallbackStatusNew)
              .append(sURL_CallbackPaySuccess, that.sURL_CallbackPaySuccess)
              .append(nID_SubjectOrgan, that.nID_SubjectOrgan)
              .isEquals();
   }

   @Override
   public int hashCode() {
      return new HashCodeBuilder(17, 37)
              .append(nID)
              .append(sID)
              .append(sURL_CallbackStatusNew)
              .append(sURL_CallbackPaySuccess)
              .append(nID_SubjectOrgan)
              .toHashCode();
   }
}
