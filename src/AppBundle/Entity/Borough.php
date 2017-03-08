<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="borough")
 * @ORM\HasLifecycleCallbacks
 */
class Borough
{
    /**
    * @ORM\Id
    * @ORM\Column(type="integer")
    * @ORM\GeneratedValue(strategy="AUTO")
    */
    protected $id;

    /**
    * @ORM\Column(type="string", length=500, nullable=false)
    */
    protected $name;

    /**
    * @ORM\Column(type="string", length=500, nullable=true)
    */
    protected $service;

    /**
    * @ORM\Column(type="string", length=50, nullable=true)
    */
    protected $telephone;

    /**
    * @ORM\Column(type="string", length=500, nullable=true)
    */
    protected $website;

    /**
    * @ORM\Column(type="text", nullable=false)
    */
    protected $coordinates;

    /**
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $created_at;

    /**
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $modified_at;

    /**
    * @ORM\PrePersist
    * @ORM\PreUpdate
    */
    public function updatedTimestamps()
    {
        $this->setModifiedAt(new \DateTime(date('Y-m-d H:i:s')));

        if($this->getCreatedAt() == null)
        {
            $this->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
        }
    }

    /**
    * Get id
    *
    * @return integer
    */
    public function getId()
    {
      return $this->id;
    }

    /**
     * Set name
     *
     * @param string $borough
     *
     * @return Borough
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set service
     *
     * @param string $service
     *
     * @return Borough
     */
    public function setService($service)
    {
        $this->service = $service;

        return $this;
    }

    /**
     * Get service
     *
     * @return string
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     *
     * @return Borough
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set website
     *
     * @param string $website
     *
     * @return Borough
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get website
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set coordinates
     *
     * @param string $coordinates
     *
     * @return Borough
     */
    public function setCoordinates($coordinates)
    {
        $this->coordinates = $coordinates;

        return $this;
    }

    /**
     * Get coordinates
     *
     * @return string
     */
    public function getCoordinates()
    {
        return $this->coordinates;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Borough
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set modifiedAt
     *
     * @param \DateTime $modifiedAt
     *
     * @return Borough
     */
    public function setModifiedAt($modifiedAt)
    {
        $this->modified_at = $modifiedAt;

        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @return \DateTime
     */
    public function getModifiedAt()
    {
        return $this->modified_at;
    }
}